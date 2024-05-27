// Importamos las dependencias necesarias
import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../publicaciones.service';
import { Publicacion } from '../publicacion.model';
import { ModalService } from '../modal.service';

// Decorador de Componente, define metadatos para el componente
@Component({
  selector: 'app-gallery', // Selector CSS para usar este componente
  templateUrl: './gallery.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./gallery.component.css'] // Rutas a los archivos de estilos CSS
})
export class GalleryComponent implements OnInit {
  publicaciones: Publicacion[] = []; // Array para almacenar las publicaciones
  allPublicaciones: Publicacion[] = []; // Array para almacenar todas las publicaciones

  // Constructor del componente, inyecta las dependencias necesarias
  constructor(private publicacionesService: PublicacionesService, private modalService: ModalService) { }

  // Método que se ejecuta cuando se inicializa el componente
  async ngOnInit(): Promise<void> {
    try {
      // Obtenemos todas las publicaciones del servicio de publicaciones
      this.allPublicaciones = await this.publicacionesService.getPublicaciones();
      // Asignamos todas las publicaciones a la variable publicaciones
      this.publicaciones = this.allPublicaciones;
    } catch (error) {
      // Si hay un error, lo mostramos en la consola
      console.error('Error al obtener las publicaciones:', error);
    }
  }

  // Método para buscar publicaciones por término de búsqueda
  search(searchTerm: string): void {
    // Si no hay término de búsqueda, mostramos todas las publicaciones
    if (!searchTerm) {
      this.publicaciones = this.allPublicaciones;
      return;
    }
    // Filtramos las publicaciones por nombre, raza y descripción
    this.publicaciones = this.allPublicaciones.filter(publicacion =>
      publicacion.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publicacion.raza?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publicacion.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Método que se ejecuta cuando se hace clic en una tarjeta
  onCardClicked(publicacion: Publicacion): void {
    // Abrimos el modal con la publicación
    this.modalService.openModal(publicacion);
  }
}