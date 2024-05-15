import { Component, OnInit, OnDestroy } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Publicacion } from '../publicacion.model';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent implements OnInit, OnDestroy {
  publicacion: Publicacion = {
    descripcion: '',
    fecha_publicacion: firebase.firestore.Timestamp.now(),
    fotos: [],
    lugar_publicacion: new firebase.firestore.GeoPoint(0, 0), // Puedes cambiar esto a los valores que necesites
    nombre: '',
    raza: ''
  };
  storage = getStorage();
  private subscription: Subscription = Subscription.EMPTY; // Aquí está la declaración de subscription

  constructor(private firestore: Firestore, private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
    this.subscription = this.authService.logoutSuccess.subscribe(() => {
      this.router.navigate(['/gallery']); // Redirige al usuario a la galería
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // No olvides cancelar la suscripción
  }

  async crearPublicacion() {
    try {
      await addDoc(collection(this.firestore, 'publicaciones'), this.publicacion);
      console.log('Publicación creada exitosamente');
      this.publicacion = {
        descripcion: '',
        fecha_publicacion: firebase.firestore.Timestamp.now(),
        fotos: [],
        lugar_publicacion: new firebase.firestore.GeoPoint(0, 0),
        nombre: '',
        raza: ''
      }; // Limpiar el formulario
    } catch (error) {
      console.error('Error al crear la publicación: ', error);
    }
  }
  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = `publicaciones/${new Date().getTime()}_${file.name}`;
        const storageRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // observe percentage changes
        uploadTask.on('state_changed', (snapshot) => {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percentage);
        });

        // get notified when the download URL is available
        uploadTask.then(() => {
          getDownloadURL(storageRef).then((url) => {
            this.publicacion.fotos.push(url);
          });
        });
      }
    }
  }
}