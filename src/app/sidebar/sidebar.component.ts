import { Component, EventEmitter, Output } from '@angular/core';
import { PublicacionesService } from '../publicaciones.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchInput: string = '';

  constructor(private publicacionesService: PublicacionesService, private authService: AuthService, private router: Router, private modalService: NgbModal) {}

  search(): void {
    this.searchEvent.emit(this.searchInput);
  }
  
  clearSearch(): void {
    this.searchInput = '';
    this.searchEvent.emit('');
  }

  async createPost(): Promise<void> {
    const isLoggedIn = await this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/crear-publicacion']);
    } else {
      this.modalService.open(LoginModalComponent, { size: 'md' });
    }
  }
}