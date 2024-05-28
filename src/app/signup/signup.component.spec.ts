import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseStorage, Storage } from '@angular/fire/storage';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    const mockFirebaseStorage = {} as FirebaseStorage;

    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ 
        MatIconModule, 
        ReactiveFormsModule // Agrega ReactiveFormsModule a la lista de imports
      ],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: Storage, useValue: mockFirebaseStorage }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});