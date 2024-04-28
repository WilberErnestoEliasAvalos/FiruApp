import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Publicacion } from './publicacion.model';
import { CardModalComponent } from './card-modal/card-modal.component'; // Ajusta la ruta según la ubicación de tu CardModalComponent

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openModal(publicacion: Publicacion): void {
    const modalRef = this.modalService.open(CardModalComponent, { size: 'xl' });
    modalRef.componentInstance.publicacion = publicacion;
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
