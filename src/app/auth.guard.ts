import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ModalService } from './modal.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private modalService: ModalService, private router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isLoggedIn = await this.authService.isLoggedIn();
    if (isLoggedIn && state.url === '/signup') {
      this.router.navigate(['/gallery']); // Redirige a la galería si el usuario ya está autenticado y trata de acceder a '/signup'
      return false;
    } else if (!isLoggedIn && state.url !== '/signup') {
      this.authService.redirectUrl = state.url; // Guarda la URL
      this.modalService.openLoginModal(); // Abre el modal de inicio de sesión
      return false;
    }
    return true;
  }
}