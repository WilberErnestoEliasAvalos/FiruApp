// Importamos los módulos necesarios de Angular y ng-bootstrap
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Importamos los modelos y componentes de nuestra aplicación
import { Publicacion } from './publicacion.model';
import { CardModalComponent } from './card-modal/card-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

// Usamos el decorador Injectable para definir metadatos para el servicio
@Injectable({
  providedIn: 'root' // Este servicio se proporciona en el nivel de raíz de la aplicación
})
export class ModalService {

  // Inyectamos NgbModal en el constructor
  constructor(private modalService: NgbModal) { }

  // Método para abrir el modal de la tarjeta
  openModal(publicacion: Publicacion): void {
    // Creamos una referencia al modal
    const modalRef = this.modalService.open(CardModalComponent, { size: 'xl' });
    // Pasamos la publicación al componente del modal
    modalRef.componentInstance.publicacion = publicacion;
  }

  // Método para abrir el modal de inicio de sesión
  openLoginModal(): void {
    // Abrimos el modal de inicio de sesión
    this.modalService.open(LoginModalComponent, { size: 'md' });
  }

  // Método para cerrar todos los modales abiertos
  closeModal(): void {
    // Cerramos todos los modales abiertos
    this.modalService.dismissAll();
  }
}