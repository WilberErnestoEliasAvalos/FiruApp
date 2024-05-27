// Importamos las dependencias necesarias
import { Component, EventEmitter, Output } from '@angular/core';
import { PublicacionesService } from '../publicaciones.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';

// Decorador de Componente, define metadatos para el componente
@Component({
  selector: 'app-sidebar', // Selector CSS para usar este componente
  templateUrl: './sidebar.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./sidebar.component.css'] // Rutas a los archivos de estilos CSS
})
export class SidebarComponent {
  @Output() searchEvent = new EventEmitter<string>(); // Evento que se emite cuando se realiza una búsqueda
  searchInput: string = ''; // Entrada de búsqueda

  // Constructor del componente, inyecta las dependencias necesarias
  constructor(private publicacionesService: PublicacionesService, private authService: AuthService, private router: Router, private modalService: NgbModal) {}

  // Método para realizar una búsqueda
  search(): void {
    // Emitimos el evento de búsqueda con la entrada de búsqueda
    this.searchEvent.emit(this.searchInput);
  }
  
  // Método para limpiar la búsqueda
  clearSearch(): void {
    // Limpiamos la entrada de búsqueda y emitimos el evento de búsqueda con una cadena vacía
    this.searchInput = '';
    this.searchEvent.emit('');
  }

  // Método para crear una publicación
  async createPost(): Promise<void> {
    // Comprobamos si el usuario está logueado
    const isLoggedIn = await this.authService.isLoggedIn();
    if (isLoggedIn) {
      // Si el usuario está logueado, navegamos a la ruta de crear publicación
      this.router.navigate(['/crear-publicacion']);
    } else {
      // Si el usuario no está logueado, abrimos el modal de inicio de sesión
      this.modalService.open(LoginModalComponent, { size: 'md' });
    }
  }
}