import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Publicacion } from '../publicacion.model';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent {
  @Input() publicacion: Publicacion | null = null;
  currentIndex: number = 0;

  constructor(public activeModal: NgbActiveModal) {}

  nextSlide() {
    if (this.publicacion && this.currentIndex < this.publicacion.fotos.length - 1) {
      this.currentIndex++;
    } else if (this.publicacion) {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.publicacion && this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.publicacion) {
      this.currentIndex = this.publicacion.fotos.length - 1;
    }
  }
}
