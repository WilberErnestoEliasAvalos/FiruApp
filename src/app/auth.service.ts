// Importamos los módulos necesarios de Angular y Firebase
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail } from '@angular/fire/auth';
import { EventEmitter } from '@angular/core';
import { ModalService } from './modal.service';

// Usamos el decorador Injectable para definir metadatos para el servicio
@Injectable({
  providedIn: 'root', // Este servicio se proporciona en el nivel de raíz de la aplicación
})
export class AuthService {
  // Definimos los eventos que se emiten cuando el inicio de sesión y el cierre de sesión son exitosos
  loginSuccess = new EventEmitter<void>();
  logoutSuccess = new EventEmitter<void>();
  // Definimos la URL a la que se redirige al usuario después del inicio de sesión
  redirectUrl: string | null = '';

  // Inyectamos Auth, ModalService y Router en el constructor
  constructor(private auth: Auth, private modalService: ModalService, private router: Router) {
    // Escuchamos el evento loginSuccess y redirigimos al usuario a la galería
    this.loginSuccess.subscribe(() => {
      this.router.navigate(['/gallery']);
    });
  }

  // Método para obtener la instancia de Auth
  getAuth() {
    return this.auth;
  }

  // Método para comprobar si el usuario está autenticado
  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          if (user) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        reject
      );
    });
  }

  // Método para iniciar sesión con correo electrónico y contraseña
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.loginSuccess.emit(); // Emitimos el evento loginSuccess
      this.modalService.closeModal(); // Cerramos el modal después de un inicio de sesión exitoso
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]); // Redirigimos al usuario
        this.redirectUrl = null; // Borramos la URL guardada
      }
    });
  }

  // Método para iniciar sesión con Google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(() => {
      this.loginSuccess.emit(); // Emitimos el evento loginSuccess
      this.modalService.closeModal(); // Cerramos el modal después de un inicio de sesión exitoso
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]); // Redirigimos al usuario
        this.redirectUrl = null; // Borramos la URL guardada
      }
    });
  }

  // Método para cerrar sesión
  logout() {
    return signOut(this.auth).then(() => {
      this.logoutSuccess.emit(); // Emitimos el evento logoutSuccess
    });
  }

  // Método para restablecer la contraseña
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      throw error;
    }
  }
}