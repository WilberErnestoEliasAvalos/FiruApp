import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Publicacion } from '../publicacion.model';

// Decorador de Componente, define metadatos para el componente
@Component({
  selector: 'app-card-modal', // Selector CSS para usar este componente
  templateUrl: './card-modal.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./card-modal.component.css'] // Rutas a los archivos de estilos CSS
})
export class CardModalComponent {
  @Input() publicacion: Publicacion | null = null; // Propiedad de entrada, recibe los datos de la publicación
  currentIndex: number = 0; // Índice de la imagen actual en el carrusel

  // Constructor del componente, inyecta NgbActiveModal para controlar el modal
  constructor(public activeModal: NgbActiveModal) {}

  // Método para avanzar al siguiente slide en el carrusel
  nextSlide() {
    // Si hay una publicación y no estamos en la última imagen, avanzamos al siguiente índice
    if (this.publicacion && this.currentIndex < this.publicacion.fotos.length - 1) {
      this.currentIndex++;
    } else if (this.publicacion) { // Si estamos en la última imagen, volvemos al inicio
      this.currentIndex = 0;
    }
  }

  // Método para retroceder al slide anterior en el carrusel
  prevSlide() {
    // Si hay una publicación y no estamos en la primera imagen, retrocedemos al índice anterior
    if (this.publicacion && this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.publicacion) { // Si estamos en la primera imagen, vamos a la última
      this.currentIndex = this.publicacion.fotos.length - 1;
    }
  }
}