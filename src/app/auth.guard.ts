import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ModalService } from './modal.service'; // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private modalService: ModalService) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isLoggedIn = await this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.authService.redirectUrl = state.url; // Guarda la URL
      this.modalService.openLoginModal(); // Abre el modal de inicio de sesión
      return false;
    }
    return true;
  }
}