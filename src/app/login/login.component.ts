import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Router } from '@angular/router'; // Para redirigir tras el login

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ''; 
  password: string = ''; 
  private loginUrl = 'https://ansurbackendnestjs-production.up.railway.app/auth/login'; 
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post(this.loginUrl, loginData).subscribe({
      next: (response: any) => {
        console.log('login exito', response);
        alert("login")
        // localStorage.setItem('token', response.token);
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        console.error('Error', error);
        alert("error")
      }
    });
  }
}
