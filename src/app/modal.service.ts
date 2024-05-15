import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Publicacion } from './publicacion.model';
import { CardModalComponent } from './card-modal/card-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openModal(publicacion: Publicacion): void {
    const modalRef = this.modalService.open(CardModalComponent, { size: 'xl' });
    modalRef.componentInstance.publicacion = publicacion;
  }
  openLoginModal(): void {
    this.modalService.open(LoginModalComponent, { size: 'md' });
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
