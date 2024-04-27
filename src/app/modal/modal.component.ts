import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../modal.service';
import { Publicacion } from '../publicacion.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  showModal: boolean = false;
  publicacion: Publicacion | null = null;
  private modalSubscription!: Subscription;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalSubscription = this.modalService.getModalState().subscribe((state: boolean) => {
      this.showModal = !!state;
    });

    this.modalSubscription = this.modalService.getPublicacionToShow().subscribe((publicacion: Publicacion | boolean | null) => {
      if (typeof publicacion === 'boolean') {
        this.publicacion = null;
      } else {
        this.publicacion = publicacion;
      }
    });
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
