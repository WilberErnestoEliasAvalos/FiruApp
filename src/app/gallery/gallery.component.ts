import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../publicaciones.service'; // Importa tu servicio para acceder a Firestore
import { DocumentData } from 'firebase/firestore';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'] // Usa styleUrls en lugar de styleUrl para cargar estilos desde un archivo externo
})
export class GalleryComponent implements OnInit {
  publicaciones: DocumentData[] = []; // Cambia el tipo de datos si tienes un modelo de publicación

  constructor(private publicacionesService: PublicacionesService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.publicaciones = await this.publicacionesService.getPublicaciones();
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  }
}
