import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-detalle-del-producto',
  templateUrl: './detalle-del-producto.component.html',
  styleUrls: ['./detalle-del-producto.component.css']
})
export class DetalleDelProductoComponent implements OnInit {
  product: any = {}; 
  quantity: number = 1; 

  private apiUrl = 'https://ansurbackendnestjs-production.up.railway.app/products'; 
  private cartApiUrl = 'https://ansurbackendnestjs-production.up.railway.app/mercadopago/payments';
  private cardTokenApiUrl = 'https://ansurbackendnestjs-production.up.railway.app/mercadopago/card_token';

  products: any[] = []; 

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); 
    if (productId) {
      this.getAllProducts(productId);
    }
  }

  getAllProducts(productId: string) {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data; 
        this.findProductById(parseInt(productId)); 
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        alert('Error al obtener los productos.');
      }
    });
  }

  findProductById(id: number) {
    this.product = this.products.find(p => p.id === id); 
    if (!this.product) {
      console.error('Producto no encontrado');
      alert('Producto no encontrado.');
    }
  }

  aumentar() {
    this.quantity++;
    this.updateQuantityInput();
  }

  disminuir() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateQuantityInput();
    }
  }

  updateQuantityInput(): void {
    const quantityInput = document.getElementById('quantity') as HTMLInputElement;
    if (quantityInput) {
      quantityInput.value = this.quantity.toString();
    }
  }

  private async generateCardToken() {
    const cardDetails = {
      card_number: '5031755734530604',
      expiration_year: '2025',
      expiration_month: 11,
      security_code: '123',
      cardholder: {
        name: 'Javier',
        identification: {
          number: '43898724',
          type: 'DNI',
        },
      },
    };

    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `${token}` }) : new HttpHeaders();

    try {
      const response = await this.http.post(this.cardTokenApiUrl, cardDetails, { headers }).toPromise();
      if (response && (response as any).id) {
        return (response as any).id;
      } else {
        throw new Error('Respuesta inválida al generar el token de tarjeta');
      }
    } catch (error) {
      console.error('Error al generar el token de tarjeta:', error);
      throw error;
    }
  }

  async onAddToCartClick() {
    if (!this.authService.isLoggedIn()) {
      this.showModal('Debe iniciar sesión para agregar productos al carrito.');
      return;
    }

    try {
      const cardToken = await this.generateCardToken();
      const idUser = localStorage.getItem('id');

      const payload = {
        transaction_amount: this.product.price * this.quantity,
        token: cardToken,
        installments: 1,
        issuer_id: '12347',
        payment_method_id: 'master',
        payer: {
          email: 'javier@gmail.com',
          identification: {
            type: 'DNI',
            number: '43898724',
          },
        },
        order: {
          id_client: idUser,
          id_address: 1,
          amount: this.product.price * this.quantity,
          products: [
            {
              id: this.product.id,
              quantity: this.quantity,
            },
          ],
        },
      };

      const authToken = localStorage.getItem('token');
      const headers = authToken ? new HttpHeaders({ Authorization: `${authToken}` }) : new HttpHeaders();

      await this.http.post(this.cartApiUrl, payload, { headers }).toPromise();
      this.showModal('Producto agregado al carrito.');
    } catch (error) {
      let errorMessage = 'Error desconocido';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Error al agregar producto al carrito:', errorMessage);
      this.showModal(`Error al agregar producto al carrito: ${errorMessage}`);
    }
  }

  showModal(message: string): void {
    const modalContent = document.getElementById('modal-content');
    if (modalContent) {
      modalContent.innerText = message;
    }
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(): void {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
