import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Publicacion } from '../publicacion.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() publicacion!: Publicacion;
  @Output() cardClicked: EventEmitter <Publicacion> = new EventEmitter <Publicacion>();

  constructor() {
    this.cardClicked = new EventEmitter <Publicacion>();
  }

  onCardClick() {
    this.cardClicked.emit(this.publicacion);
  }
}