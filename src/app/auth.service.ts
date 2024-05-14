import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }

  login(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  loginWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  logout() {
    const auth = getAuth();
    return signOut(auth);
  }
}