import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  // Otras rutas
  { path: 'crear-publicacion', component: CrearPublicacionComponent, canActivate: [AuthGuard] },
  { path: 'gallery', component: GalleryComponent },
  { path: '', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
