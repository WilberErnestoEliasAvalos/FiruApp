import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { AuthService } from './auth.service'; // Asegúrate de que esta ruta es correcta
import { Auth } from '@angular/fire/auth'; // Asegúrate de que esta ruta es correcta

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalService,
        AuthService,
        { provide: Auth, useValue: {} } // Proporciona un valor ficticio para Auth
      ]
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});