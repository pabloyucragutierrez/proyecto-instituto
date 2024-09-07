import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  products: any[] = [];
  private apiUrl = 'https://ansurbackendnestjs-production.up.railway.app/products'; 

  constructor(private http: HttpClient) {} 

  ngOnInit() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error al obtener los productos:', err); 
        alert(`error en la api`)
      }
    });
  }

  viewProduct(product: any): void {
    alert(`Ver producto: ${product.name}`);
  }
}
