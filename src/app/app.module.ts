// Importamos los componentes necesarios de nuestra aplicación
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CardsComponent } from './cards/cards.component';
import { CardModalComponent } from './card-modal/card-modal.component';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';

// Importamos los módulos necesarios de Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// Importamos los módulos necesarios de AngularFire
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

// Importamos los módulos necesarios de nuestra aplicación
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Usamos el decorador NgModule para definir metadatos para el módulo
@NgModule({
  // Declaramos los componentes que forman parte de este módulo
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
  // Importamos los módulos necesarios
  imports: [
    BrowserModule,
    MatIconModule,
    FormsModule,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
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
  // Proveemos los servicios necesarios
  providers: [
    provideAnimationsAsync()
  ],
  // Definimos el componente de arranque de la aplicación
  bootstrap: [AppComponent]
})
// Definimos la clase AppModule
export class AppModule { }