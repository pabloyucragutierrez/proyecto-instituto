import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  images: string[] = [
    'assets/banner1.png',
    'assets/banner2.png',
    'assets/banner3.png',
    'assets/banner4.png',
    'assets/banner5.png',
  ];
  currentIndex: number = 0;

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.updateSlides();
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
    this.updateSlides();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
    this.updateSlides();
  }

  private updateSlides(): void {
    const slides = document.querySelector('.slides') as HTMLElement;
    slides.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }


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
