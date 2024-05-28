import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { PublicacionesService } from '../publicaciones.service';
import { Firestore, provideFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { Auth, provideAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    const mockFirestore = {}; // Crea un objeto simulado para Firestore
    const mockAuth = {}; // Crea un objeto simulado para Auth

    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [ FormsModule ], // Añade FormsModule a la lista de imports
      providers: [
        PublicacionesService,
        AuthService,
        { provide: Firestore, useValue: mockFirestore }, // Proporciona el objeto simulado para Firestore
        { provide: Auth, useValue: mockAuth } // Proporciona el objeto simulado para Auth
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});