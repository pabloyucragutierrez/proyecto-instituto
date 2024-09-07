import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  products: any[] = [];
  categorias: any[] = [];

  iconosPorCategoria: { [key: string]: string } = {
    Hogar: 'bx bx-home',
    Computación: 'bx bx-laptop',
    Accesorios: 'bx bx-headphone',
    Limpieza: 'bx bxs-washer',
    Otros: 'bx bx-plus-circle',
  };

  private apiUrl = 'https://ansurbackendnestjs-production.up.railway.app/products';
  private apiCategorias = 'https://ansurbackendnestjs-production.up.railway.app/categories';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // get productos
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;
        // Inicializa la cantidad de cada producto
        this.products.forEach(product => product.quantity = 1);
        console.log(data);
      },
      error: (err) => {
        console.error('Error al obtener los productos:', err);
        alert(`error en la api`);
      },
    });

    // get categorias
    this.http.get<any[]>(this.apiCategorias).subscribe({
      next: (data: any) => {
        this.categorias = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error al obtener las categorías:', err);
        alert(`error en la api`);
      },
    });
  }

  // get productos por categorias
  getIdCategory(id: number) {
    const apiPC = `https://ansurbackendnestjs-production.up.railway.app/products/category/${id}`;
    this.http.get<any[]>(apiPC).subscribe({
      next: (data: any) => {
        this.products = data;
        // Inicializa la cantidad de cada producto
        this.products.forEach(product => product.quantity = 1);
        console.log(apiPC);
        console.log('categorias x id', id);
        console.log('productos', data);
      },
      error: (err) => {
        console.error('Error al obtener el id de las categorías:', err);
        alert(`error en la api`);
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
}
