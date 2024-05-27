import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../auth.service';
import { Auth } from '@angular/fire/auth';
import { of } from 'rxjs'; // Importa 'of' de 'rxjs'

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { 
          provide: AuthService, 
          useValue: { 
            authState$: of(null), // Proporciona un Observable que emite 'null'
            loginSuccess: of(null), // Proporciona un Observable que emite 'null'
            getAuth: () => ({}) // Proporciona un método ficticio para getAuth
          } 
        },
        { 
          provide: Auth, 
          useValue: {} 
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});