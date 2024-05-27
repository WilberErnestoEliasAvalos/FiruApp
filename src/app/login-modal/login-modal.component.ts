// Importamos las dependencias necesarias
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ModalService } from '../modal.service';

// Decorador de Componente, define metadatos para el componente
@Component({
  selector: 'app-login-modal', // Selector CSS para usar este componente
  templateUrl: './login-modal.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./login-modal.component.css'], // Rutas a los archivos de estilos CSS
})
export class LoginModalComponent {
  // Definimos las propiedades del componente
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showResetPasswordForm: boolean = false;
  statusMessage: string = '';

  // Constructor del componente, inyecta las dependencias necesarias
  constructor(private authService: AuthService, private modalService: ModalService) {}

  // Método para cerrar el modal
  closeModal(): void {
    this.modalService.closeModal();
  }

  // Método para mostrar u ocultar el formulario de restablecimiento de contraseña
  toggleResetPasswordForm(): void {
    this.showResetPasswordForm = !this.showResetPasswordForm;
    this.statusMessage = '';
  }

  // Método para iniciar sesión o restablecer la contraseña
  async loginOrResetPassword(): Promise<void> {
    if (this.showResetPasswordForm) {
      try {
        // Intentamos restablecer la contraseña
        await this.authService.resetPassword(this.email);
        this.statusMessage =
          'Se ha enviado un correo electrónico de restablecimiento de contraseña a tu correo electrónico.';
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          this.statusMessage =
            'No hay ninguna cuenta registrada con ese correo electrónico.';
        } else {
          // Manejar otros errores
        }
      }
    } else {
      // Intentamos iniciar sesión
      this.authService.login(this.email, this.password).catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
        } else {
          this.errorMessage = 'Ocurrió un error al iniciar sesión.';
        }
      });
    }
  }

  // Método para iniciar sesión con Google
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