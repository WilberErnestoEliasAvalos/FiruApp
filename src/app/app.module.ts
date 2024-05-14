import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CardsComponent } from './cards/cards.component';
import { CardModalComponent } from './card-modal/card-modal.component';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp({
      projectId: "firupets-9ea19",
      appId: "1:19444182072:web:8512ceb1ec0de755a00acd",
      storageBucket: "firupets-9ea19.appspot.com",
      apiKey: "AIzaSyDyfMc36a3qi4vTzj-sdzZengorUVnKEd0",
      authDomain: "firupets-9ea19.firebaseapp.com",
      messagingSenderId: "19444182072"
    })),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
