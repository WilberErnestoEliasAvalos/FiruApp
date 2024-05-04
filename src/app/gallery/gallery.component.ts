import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../publicaciones.service';
import { Publicacion } from '../publicacion.model';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  allPublicaciones: Publicacion[] = [];

  constructor(private publicacionesService: PublicacionesService, private modalService: ModalService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.allPublicaciones = await this.publicacionesService.getPublicaciones();
      this.publicaciones = this.allPublicaciones;
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  }

  search(searchTerm: string): void {
    if (!searchTerm) {
      this.publicaciones = this.allPublicaciones;
      return;
    }
    this.publicaciones = this.allPublicaciones.filter(publicacion =>
      publicacion.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publicacion.raza?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publicacion.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onCardClicked(publicacion: Publicacion): void {
    this.modalService.openModal(publicacion);
  }
}
