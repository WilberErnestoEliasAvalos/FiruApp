import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password).then(() => {
      // Inicio de sesión exitoso
    }).catch((error) => {
      // Error en el inicio de sesión
      console.error(error);
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(() => {
      // Inicio de sesión exitoso
    }).catch((error) => {
      // Error en el inicio de sesión
      console.error(error);
    });
  }
}