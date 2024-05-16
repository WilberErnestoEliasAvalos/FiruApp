import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail } from '@angular/fire/auth';
import { EventEmitter } from '@angular/core';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginSuccess = new EventEmitter<void>();
  logoutSuccess = new EventEmitter<void>();
  redirectUrl: string | null = '';

  constructor(private auth: Auth, private modalService: ModalService, private router: Router) {
    // Escucha el evento loginSuccess y redirige a la galería
    this.loginSuccess.subscribe(() => {
      this.router.navigate(['/gallery']);
    });
  }
  getAuth() {
    return this.auth;
  }

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

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.loginSuccess.emit();
      this.modalService.closeModal(); // Cierra el modal después de un inicio de sesión exitoso
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]); // Redirige al usuario
        this.redirectUrl = null; // Borra la URL guardada
      }
    });
  }
  
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(() => {
      this.loginSuccess.emit();
      this.modalService.closeModal(); // Cierra el modal después de un inicio de sesión exitoso
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]); // Redirige al usuario
        this.redirectUrl = null; // Borra la URL guardada
      }
    });
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.logoutSuccess.emit();
    });
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      throw error;
    }
  }
}
