import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  products: any[] = [];
  private apiUrl = 'https://ansurbackendnestjs-production.up.railway.app/products'; 

  constructor(private http: HttpClient) {} 

  // slider banner

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

// pruductos get

  ngOnInit() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;
        this.products.forEach(product => product.quantity = 1);
        console.log(data);
      },
      error: (err) => {
        console.error('Error al obtener los productos:', err); 
        alert(`error en la api`)
      }
    });
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
