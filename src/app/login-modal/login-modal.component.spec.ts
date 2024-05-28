import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginModalComponent } from './login-modal.component';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  beforeEach(async () => {
    const mockAuth = {};

    await TestBed.configureTestingModule({
      declarations: [ LoginModalComponent ],
      imports: [ 
        FormsModule,
        RouterModule.forRoot([]) // Agrega RouterModule a la lista de imports
      ],
      providers: [
        { provide: Auth, useValue: mockAuth }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});