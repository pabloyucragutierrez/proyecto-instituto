import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Asegúrate de tener un servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Usuario autenticado, permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige a la página de login
      return false; // Usuario no autenticado, bloquea el acceso
    }
  }
}
