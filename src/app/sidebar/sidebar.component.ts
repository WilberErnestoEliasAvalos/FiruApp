import { Component, EventEmitter, Output } from '@angular/core';
import { PublicacionesService } from '../publicaciones.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchInput: string = '';

  constructor(private publicacionesService: PublicacionesService) {}

  search(): void {
    this.searchEvent.emit(this.searchInput);
  }
  clearSearch(): void {
    this.searchInput = '';
    this.searchEvent.emit('');
  }
}
