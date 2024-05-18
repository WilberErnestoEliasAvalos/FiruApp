import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CardsComponent } from './cards/cards.component';
import { CardModalComponent } from './card-modal/card-modal.component';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
// Importaciones de AngularFire
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GalleryComponent,
    LoginModalComponent,
    SidebarComponent,
    WelcomeComponent,
    CardsComponent,
    CardModalComponent,
    CrearPublicacionComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    FormsModule,
    MatTooltipModule,
    AppRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDyfMc36a3qi4vTzj-sdzZengorUVnKEd0",
      authDomain: "firupets-9ea19.firebaseapp.com",
      projectId: "firupets-9ea19",
      storageBucket: "firupets-9ea19.appspot.com",
      messagingSenderId: "19444182072",
      appId: "1:19444182072:web:8512ceb1ec0de755a00acd",
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
