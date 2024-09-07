import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Router } from '@angular/router'; // Importa Router para redireccionar

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    name: '',
    lastname: '',
    phone: '',
    email: '',
    password: ''
  };

  private registerUrl = 'https://ansurbackendnestjs-production.up.railway.app/auth/register'; 

  showEmptyFormError: boolean = false;
  showApiError: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: any) {
    if (form.invalid) {
      this.showEmptyFormError = true;
      return;
    }

    this.http.post(this.registerUrl, this.user).subscribe({
      next: (response: any) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']); 
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        this.showApiError = true;
      }
    });
  }
}
