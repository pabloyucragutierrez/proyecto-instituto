import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  products: any[] = [];
  categorias: any[] = [];
  private apiUrl = 'https://ansurbackendnestjs-production.up.railway.app/products';
  private apiCategorias = 'https://ansurbackendnestjs-production.up.railway.app/categories';
  private searchApiUrl = 'https://ansurbackendnestjs-production.up.railway.app/products/search/';

  iconosPorCategoria: { [key: string]: string } = {
    Hogar: 'bx bx-home',
    Computación: 'bx bx-laptop',
    Accesorios: 'bx bx-headphone',
    Limpieza: 'bx bxs-washer',
    Otros: 'bx bx-plus-circle',
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const searchTerm = params['search'];
      if (searchTerm) {
        this.searchProducts(searchTerm);
      } else {
        this.loadAllProducts();
      }
    });

    this.loadCategories();
  }

  loadAllProducts() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;
        this.products.forEach(product => product.quantity = 1);
        console.log(data);
      },
      error: (err) => {
        console.error('Error al obtener los productos:', err);
        alert('Error en la API');
      },
    });
  }

  searchProducts(searchTerm: string) {
    const searchUrl = `${this.searchApiUrl}${searchTerm}`;
    this.http.get<any[]>(searchUrl).subscribe({
      next: (data) => {
        this.products = data;
        this.products.forEach(product => product.quantity = 1);
        console.log('Productos encontrados:', data);
      },
      error: (err) => {
        console.error('Error al buscar productos:', err);
        alert('Error al realizar la búsqueda');
      },
    });
  }

  loadCategories() {
    this.http.get<any[]>(this.apiCategorias).subscribe({
      next: (data) => {
        this.categorias = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error al obtener las categorías:', err);
        alert('Error en la API');
      },
    });
  }

  getIdCategory(id: number) {
    const apiPC = `https://ansurbackendnestjs-production.up.railway.app/products/category/${id}`;
    this.http.get<any[]>(apiPC).subscribe({
      next: (data) => {
        this.products = data;
        this.products.forEach(product => product.quantity = 1);
        console.log('Productos filtrados por categoría', data);
      },
      error: (err) => {
        console.error('Error al obtener los productos por categoría:', err);
        alert('Error al filtrar por categoría');
      },
    });
  }

  obtenerIcono(categoriaNombre: string): string {
    return this.iconosPorCategoria[categoriaNombre] || 'bx bx-question-mark';
  }

  aumentar(product: any) {
    product.quantity++;
  }

  disminuir(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }


  onAddToCartClick() {
    if (!this.authService.isLoggedIn()) {
      this.showModal('Debe iniciar sesión para agregar productos al carrito.');
    } else {
      this.showModal('Producto agregado al carrito.');
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
