import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { onAuthStateChanged, User as FirebaseUser } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user$: Observable<FirebaseUser | null>;
  modalReference: any;

  constructor(private modalService: NgbModal, private router: Router, private authService: AuthService) {
    this.user$ = new Observable((subscriber) => {
      onAuthStateChanged(this.authService.getAuth(), (user) => {
        subscriber.next(user);
      });
    });

    // Escucha el evento de inicio de sesión exitoso
    this.authService.loginSuccess.subscribe(() => {
      if (this.modalReference) {
        this.modalReference.close();
      }
    });
  }

  openLoginModal() {
    this.modalReference = this.modalService.open(LoginModalComponent, {
      size: 'md'
    });
  }

  logout() {
    this.authService.logout();
  }
}