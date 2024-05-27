// Importamos el decorador de Componente de Angular
import { Component } from '@angular/core';

// Usamos el decorador de Componente para definir metadatos para el componente
@Component({
  selector: 'app-root', // Selector CSS para usar este componente
  templateUrl: './app.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./app.component.css'] // Rutas a los archivos de estilos CSS
})
// Definimos la clase AppComponent
export class AppComponent {
  // Definimos la propiedad title y le asignamos el valor 'FiruPets'
  title = 'FiruPets';
}