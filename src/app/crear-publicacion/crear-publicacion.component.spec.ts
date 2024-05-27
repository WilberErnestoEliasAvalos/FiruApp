import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPublicacionComponent } from './crear-publicacion.component';
import { Firestore, FirestoreInstances } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { Auth } from '@angular/fire/auth';
import { of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirebaseApp } from '@angular/fire/compat';

describe('CrearPublicacionComponent', () => {
  let component: CrearPublicacionComponent;
  let fixture: ComponentFixture<CrearPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearPublicacionComponent],
      imports: [], // Aquí puedes importar los módulos que tu componente necesita
      providers: [
        { provide: Firestore, useValue: { collection: () => of([]) } },
        { provide: FirestoreInstances, useValue: [] },
        { provide: AuthService, useValue: { /* Aquí puedes proporcionar un valor ficticio para AuthService */ } },
        { provide: Auth, useValue: { authState: of(null) } }, // Proporcionamos un valor ficticio para Auth
        { provide: AngularFireStorage, useValue: { ref: () => ({ getDownloadURL: () => of('url') }) } }, // Proporcionamos un valor ficticio para AngularFireStorage
        { provide: FirebaseApp, useValue: { /* Aquí puedes proporcionar un valor ficticio para FirebaseApp */ } } // Proporcionamos un valor ficticio para FirebaseApp
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});