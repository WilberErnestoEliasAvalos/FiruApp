import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged,sendPasswordResetEmail } from '@angular/fire/auth';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginSuccess = new EventEmitter<void>();
  constructor(private auth: Auth) {}

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
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(() => {
      this.loginSuccess.emit();
    });
  }

  logout() {
    return signOut(this.auth);
  }
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      throw error;
    }
  }
}
