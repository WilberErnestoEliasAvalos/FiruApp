import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  backgrounds: string[] = [
    'https://pbs.twimg.com/media/GHI7KyyXsAAsb7Q?format=jpg&name=medium',
    'https://images3.alphacoders.com/104/104657.jpg',
    'https://images.alphacoders.com/786/786992.jpg',
    'https://images7.alphacoders.com/106/1067344.jpg',
    'https://www.xtrafondos.com/wallpapers/perro-el-sala-9194.jpg',
    'https://th.bing.com/th/id/R.97a1d32695198bc4d7b4fef5288bf557?rik=ivYaIQ7f6HFZ4Q&riu=http%3a%2f%2f4.bp.blogspot.com%2f-xqfLVupoNXA%2fUcnoUUxrHlI%2fAAAAAAAAAC0%2fjy7-AQUZFjA%2fw1200-h630-p-k-no-nu%2fPERRITO.jpg&ehk=rKRz27JvbVzGUAjUsheBIsod35VXytkFbJ7olL%2bdhOY%3d&risl=&pid=ImgRaw&r=0'
    // Agrega más URLs de imágenes de fondo según sea necesario
  ];
  currentBackgroundIndex: number = 0;

  ngOnInit() {
    setInterval(() => {
      this.changeBackground();
    }, 7000); // Cambia la duración según tus preferencias
  }

  changeBackground() {
    this.currentBackgroundIndex++;
    if (this.currentBackgroundIndex >= this.backgrounds.length) {
      this.currentBackgroundIndex = 0;
    }
  }
}
