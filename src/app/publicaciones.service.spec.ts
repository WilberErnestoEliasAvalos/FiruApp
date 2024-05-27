import { TestBed } from '@angular/core/testing';
import { PublicacionesService } from './publicaciones.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('PublicacionesService', () => {
  let service: PublicacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PublicacionesService,
        { 
          provide: Firestore, 
          useValue: {
            collection: () => ({
              doc: () => ({
                valueChanges: () => of({}), // Asume que usas valueChanges en algún lugar
                set: () => Promise.resolve(),
              }),
              valueChanges: () => of({}), // Asume que usas valueChanges en algún lugar
              add: () => Promise.resolve(),
            }),
          },
        },
      ],
    });
    service = TestBed.inject(PublicacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});