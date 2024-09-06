import { Component } from '@angular/core';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {

  products = [
    { imageUrl: 'assets/cintasembalaje1.jpg', title: 'Producto 1', price: 29.99 },
    { imageUrl: 'assets/cintasembalaje2.jpg', title: 'Producto 2', price: 29.99 },
    { imageUrl: 'assets/cintasembalaje1.jpg', title: 'Producto 1', price: 29.99 },
    { imageUrl: 'assets/cintasembalaje2.jpg', title: 'Producto 2', price: 29.99 },
    { imageUrl: 'assets/cintasembalaje1.jpg', title: 'Producto 1', price: 29.99 },
    { imageUrl: 'assets/cintasembalaje2.jpg', title: 'Producto 2', price: 29.99 },
    { imageUrl: 'assets/cintasembalaje1.jpg', title: 'Producto 1', price: 29.99 },
    { imageUrl: 'assets/cintasembalaje2.jpg', title: 'Producto 2', price: 29.99 },
    { imageUrl: 'assets/cintasembalaje1.jpg', title: 'Producto 1', price: 29.99 },
    { imageUrl: 'assets/cintasembalaje2.jpg', title: 'Producto 2', price: 29.99 },
    { imageUrl: 'assets/cintasembalaje1.jpg', title: 'Producto 1', price: 29.99 },
    { imageUrl: 'assets/cintasembalaje2.jpg', title: 'Producto 2', price: 29.99 },
    // Agrega más productos aquí
  ];

  viewProduct(product: any): void {
    alert(`Ver producto: ${product.title}`); // Aquí puedes redirigir o mostrar más detalles del producto
  }
  
}
