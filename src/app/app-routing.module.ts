// Importamos los módulos necesarios de Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importamos los componentes de nuestra aplicación
import { GalleryComponent } from './gallery/gallery.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';

// Importamos el guardia de autenticación
import { AuthGuard } from './auth.guard';

// Importamos el componente de registro
import { SignupComponent } from './signup/signup.component';

// Definimos las rutas de nuestra aplicación
const routes: Routes = [
  // Ruta para crear una publicación, protegida por el guardia de autenticación
  { path: 'crear-publicacion', component: CrearPublicacionComponent, canActivate: [AuthGuard] },
  // Ruta para la galería
  { path: 'gallery', component: GalleryComponent },
  // Ruta por defecto que lleva a la pantalla de bienvenida
  { path: '', component: WelcomeComponent },
  // Ruta para el registro, protegida por el guardia de autenticación
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
];

// Usamos el decorador NgModule para definir metadatos para el módulo
@NgModule({
  // Importamos RouterModule y configuramos las rutas
  imports: [RouterModule.forRoot(routes)],
  // Exportamos RouterModule para que los componentes de otros módulos puedan usarlo
  exports: [RouterModule]
})
// Definimos la clase AppRoutingModule
export class AppRoutingModule { }