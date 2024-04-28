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

  constructor(private publicacionesService: PublicacionesService, private modalService: ModalService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.publicaciones = await this.publicacionesService.getPublicaciones();
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  }

  onCardClicked(publicacion: Publicacion): void {
    this.modalService.openModal(publicacion);
  }
}
