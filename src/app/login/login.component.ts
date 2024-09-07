import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Router } from '@angular/router'; // Para redirigir tras el login

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private loginUrl =
    'https://ansurbackendnestjs-production.up.railway.app/auth/login';

  // Flags para mostrar los modales
  showEmptyFormError: boolean = false;
  showApiError: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Verifica si el formulario está vacío
    if (!this.email || !this.password) {
      this.showEmptyFormError = true;
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post(this.loginUrl, loginData).subscribe({
      next: (response: any) => {
        this.router.navigate(['/inicio']);
        console.log('login exito', response);
        localStorage.setItem('nombre', response.user.name);
        localStorage.setItem('apellidos', response.user.lastname);
        localStorage.setItem('token', response.token);
      },
      error: (error) => {
        console.error('Error', error);
        this.showApiError = true;
      },
    });
  }
}
