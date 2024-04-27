import { Component, Input } from '@angular/core';
import { Publicacion } from '../publicacion.model';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  @Input() publicacion!: Publicacion;

  constructor(private modalService: ModalService) {}

  abrirModal() {
    this.modalService.openModal(this.publicacion);
  }
}
