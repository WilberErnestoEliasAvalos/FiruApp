import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publicacion } from './publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private publicacionToShow: BehaviorSubject<boolean | Publicacion | null> = new BehaviorSubject<boolean | Publicacion | null>(null);

  constructor() {}
  
  getModalState(): Observable<boolean> {
  return this.modalState.asObservable();
  }
  
  getPublicacionToShow(): Observable<boolean | Publicacion | null> {
  return this.publicacionToShow.asObservable();
  }
  
  openModal(publicacion: Publicacion): void {
  this.modalState.next(true);
  this.publicacionToShow.next(publicacion);
  }
  
  closeModal(): void {
  this.modalState.next(false);
  this.publicacionToShow.next(null);
  }
  }