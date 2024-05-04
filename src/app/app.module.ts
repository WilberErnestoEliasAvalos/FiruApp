import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome/welcome.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CardsComponent } from './cards/cards.component';
import { CardModalComponent } from './card-modal/card-modal.component';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { FormsModule } from '@angular/forms';

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
    CrearPublicacionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp({"projectId":"firupets-9ea19","appId":"1:19444182072:web:8512ceb1ec0de755a00acd","storageBucket":"firupets-9ea19.appspot.com","apiKey":"AIzaSyDyfMc36a3qi4vTzj-sdzZengorUVnKEd0","authDomain":"firupets-9ea19.firebaseapp.com","messagingSenderId":"19444182072"})),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
