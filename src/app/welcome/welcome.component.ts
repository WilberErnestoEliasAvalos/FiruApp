// Importamos el decorador de Componente de Angular
import { Component } from '@angular/core';

// Usamos el decorador de Componente para definir metadatos para el componente
@Component({
  selector: 'app-welcome', // Selector CSS para usar este componente
  templateUrl: './welcome.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./welcome.component.css'] // Rutas a los archivos de estilos CSS
})
export class WelcomeComponent {
  // Array de URLs de imágenes de fondo
  backgrounds: string[] = [
    'https://pbs.twimg.com/media/GHI7KyyXsAAsb7Q?format=jpg&name=medium',
    'https://images3.alphacoders.com/104/104657.jpg',
    'https://images.alphacoders.com/786/786992.jpg',
    'https://images7.alphacoders.com/106/1067344.jpg',
    'https://www.xtrafondos.com/wallpapers/perro-el-sala-9194.jpg',
    'https://th.bing.com/th/id/R.97a1d32695198bc4d7b4fef5288bf557?rik=ivYaIQ7f6HFZ4Q&riu=http%3a%2f%2f4.bp.blogspot.com%2f-xqfLVupoNXA%2fUcnoUUxrHlI%2fAAAAAAAAAC0%2fjy7-AQUZFjA%2fw1200-h630-p-k-no-nu%2fPERRITO.jpg&ehk=rKRz27JvbVzGUAjUsheBIsod35VXytkFbJ7olL%2bdhOY%3d&risl=&pid=ImgRaw&r=0'
    // Agrega más URLs de imágenes de fondo según sea necesario
  ];
  // Índice de la imagen de fondo actual
  currentBackgroundIndex: number = 0;

  // Método que se ejecuta cuando se inicializa el componente
  ngOnInit() {
    // Configura un intervalo para cambiar la imagen de fondo cada 7 segundos
    setInterval(() => {
      this.changeBackground();
    }, 7000); // Cambia la duración según tus preferencias
  }

  // Método para cambiar la imagen de fondo
  changeBackground() {
    // Incrementa el índice de la imagen de fondo
    this.currentBackgroundIndex++;
    // Si el índice es mayor o igual al número de imágenes de fondo, lo reinicia a 0
    if (this.currentBackgroundIndex >= this.backgrounds.length) {
      this.currentBackgroundIndex = 0;
    }
  }
}