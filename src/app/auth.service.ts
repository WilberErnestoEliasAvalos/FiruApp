import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginSuccess = new EventEmitter<void>(); // Añade esta línea
  constructor(private auth: Auth) { }

  getAuth() {
    return this.auth;
  }
  
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.loginSuccess.emit(); // Añade esta línea
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(() => {
      this.loginSuccess.emit(); // Añade esta línea
    });
  }

  logout() {
    return signOut(this.auth);
  }
}