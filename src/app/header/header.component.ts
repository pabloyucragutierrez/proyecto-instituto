import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: string | null = '';
  searchTerm: string = '';
  private searchApiUrl = 'https://ansurbackendnestjs-production.up.railway.app/products/search/';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('nombre');
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    window.location.reload();
  }

  searchProduct() {
    if (!this.searchTerm.trim()) {
      this.showModal('Ingrese algpún producto para buscar');
      return;
    }

    const searchUrl = `${this.searchApiUrl}${this.searchTerm}`;
    this.http.get<any[]>(searchUrl).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.router.navigate(['/productos'], {
            queryParams: { search: this.searchTerm }
          });
        } else {
          this.showModal('No se encontraron productos.');
        }
      },
      error: (err) => {
        console.error('Error al buscar productos:', err);
        this.showModal('Ocurrió un error al realizar la búsqueda. Por favor, intenta nuevamente.');
      },
    });
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
