// Importamos los módulos necesarios de Angular y RxJS
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

// Importamos los servicios de nuestra aplicación
import { AuthService } from './auth.service';
import { ModalService } from './modal.service'; 

// Usamos el decorador Injectable para definir metadatos para el servicio
@Injectable({
  providedIn: 'root' // Este servicio se proporciona en el nivel de raíz de la aplicación
})
// Definimos la clase AuthGuard que implementa la interfaz CanActivate
export class AuthGuard implements CanActivate {

  // Inyectamos AuthService, ModalService y Router en el constructor
  constructor(private authService: AuthService, private modalService: ModalService, private router: Router) { }

  // Definimos el método canActivate que se llama cuando Angular decide si una ruta puede ser activada
  async canActivate(
    route: ActivatedRouteSnapshot, // Información sobre la ruta activada
    state: RouterStateSnapshot // Información sobre el estado del router
  ): Promise<boolean | UrlTree> {
    // Comprobamos si el usuario está autenticado
    const isLoggedIn = await this.authService.isLoggedIn();
    // Si el usuario está autenticado y trata de acceder a '/signup', lo redirigimos a '/gallery'
    if (isLoggedIn && state.url === '/signup') {
      this.router.navigate(['/gallery']);
      return false;
    // Si el usuario no está autenticado y no está tratando de acceder a '/signup', abrimos el modal de inicio de sesión
    } else if (!isLoggedIn && state.url !== '/signup') {
      this.authService.redirectUrl = state.url; // Guardamos la URL a la que el usuario estaba tratando de acceder
      this.modalService.openLoginModal();
      return false;
    }
    // Si ninguna de las condiciones anteriores se cumple, permitimos que la ruta sea activada
    return true;
  }
}