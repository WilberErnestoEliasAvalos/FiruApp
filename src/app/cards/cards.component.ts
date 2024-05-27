// Importamos los decoradores necesarios y el modelo de Publicacion
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Publicacion } from '../publicacion.model';

// Decorador de Componente, define metadatos para el componente
@Component({
  selector: 'app-cards', // Selector CSS para usar este componente
  templateUrl: './cards.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./cards.component.css'] // Rutas a los archivos de estilos CSS
})
export class CardsComponent {
  @Input() publicacion!: Publicacion; // Propiedad de entrada, recibe los datos de la publicación
  @Output() cardClicked: EventEmitter <Publicacion> = new EventEmitter <Publicacion>(); // Evento personalizado que se emite cuando se hace clic en la tarjeta

  // Constructor del componente
  constructor() {
    // Inicializamos el evento personalizado
    this.cardClicked = new EventEmitter <Publicacion>();
  }

  // Método que se ejecuta cuando se hace clic en la tarjeta
  onCardClick() {
    // Emitimos el evento personalizado, pasando la publicación como argumento
    this.cardClicked.emit(this.publicacion);
  }
}