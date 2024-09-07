import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalle-del-producto',
  templateUrl: './detalle-del-producto.component.html',
  styleUrls: ['./detalle-del-producto.component.css']
})
export class DetalleDelProductoComponent implements OnInit {
  product: any = {}; 
  quantity: number = 1; 

  private apiUrl = 'https://ansurbackendnestjs-production.up.railway.app/products'; 
  products: any[] = []; 

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

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
        console.log('Todos los productos:', data);
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
    if (this.product) {
      console.log('Producto encontrado:', this.product);
    } else {
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
}
