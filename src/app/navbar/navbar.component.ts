// Importamos las dependencias necesarias
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { onAuthStateChanged, User as FirebaseUser } from '@angular/fire/auth';

// Decorador de Componente, define metadatos para el componente
@Component({
  selector: 'app-navbar', // Selector CSS para usar este componente
  templateUrl: './navbar.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./navbar.component.css'] // Rutas a los archivos de estilos CSS
})
export class NavbarComponent {
  user$: Observable<FirebaseUser | null>; // Observable del usuario actual
  modalReference: any; // Referencia al modal abierto

  // Constructor del componente, inyecta las dependencias necesarias
  constructor(private modalService: NgbModal, private router: Router, private authService: AuthService) {
    // Creamos un Observable que emite el usuario actual
    this.user$ = new Observable((subscriber) => {
      onAuthStateChanged(this.authService.getAuth(), (user) => {
        subscriber.next(user);
      });
    });

    // Escuchamos el evento de inicio de sesión exitoso
    this.authService.loginSuccess.subscribe(() => {
      // Si hay un modal abierto, lo cerramos
      if (this.modalReference) {
        this.modalReference.close();
      }
    });
  }

  // Método para abrir el modal de inicio de sesión
  openLoginModal() {
    // Abrimos el modal y guardamos la referencia
    this.modalReference = this.modalService.open(LoginModalComponent, {
      size: 'md'
    });
  }

  // Método para cerrar la sesión
  logout() {
    this.authService.logout();
  }
}