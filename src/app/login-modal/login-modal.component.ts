import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showResetPasswordForm: boolean = false;
  statusMessage: string = '';

  constructor(private authService: AuthService) {}

  toggleResetPasswordForm(): void {
    this.showResetPasswordForm = !this.showResetPasswordForm;
    this.statusMessage = '';
  }

  async loginOrResetPassword(): Promise<void> {
    if (this.showResetPasswordForm) {
      try {
        await this.authService.resetPassword(this.email);
        this.statusMessage = 'Se ha enviado un correo electrónico de restablecimiento de contraseña a tu correo electrónico.';
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          this.statusMessage = 'No hay ninguna cuenta registrada con ese correo electrónico.';
        } else {
          // Manejar otros errores
        }
      }
    } else {
      this.authService.login(this.email, this.password).catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
        } else {
          this.errorMessage = 'Ocurrió un error al iniciar sesión.';
        }
      });
    }
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => {
        // Inicio de sesión exitoso
      })
      .catch((error) => {
        // Error en el inicio de sesión
        console.error(error);
      });
  }
}