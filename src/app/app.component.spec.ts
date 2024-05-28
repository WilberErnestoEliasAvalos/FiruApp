import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Importa RouterTestingModule
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './auth.service'; // Importa AuthService
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';


// Creamos un mock para Auth
class MockAuth {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Agrega RouterTestingModule a los imports
      ],
      declarations: [AppComponent, NavbarComponent],
      providers: [
        { 
          provide: AuthService, 
          useValue: { 
            authState$: of({ /* Proporciona un usuario simulado */ }), 
            loginSuccess: new EventEmitter<void>(), 
            logoutSuccess: new EventEmitter<void>(), 
            getAuth: () => ({}), 
            login: () => Promise.resolve(), 
            logout: () => Promise.resolve()
          } 
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FiruPets'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('FiruPets');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, FiruPets'
    );
  });
});
