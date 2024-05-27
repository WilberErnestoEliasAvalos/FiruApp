// Importamos las dependencias necesarias
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Publicacion } from '../publicacion.model';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

// Decorador de Componente, define metadatos para el componente
@Component({
  selector: 'app-crear-publicacion', // Selector CSS para usar este componente
  templateUrl: './crear-publicacion.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./crear-publicacion.component.css'] // Rutas a los archivos de estilos CSS
})
export class CrearPublicacionComponent implements OnInit, OnDestroy {
  // Definimos las propiedades del componente
  public animalSeleccionado: string | null = null;
  publicacionForm: FormGroup;
  publicacion: Publicacion = {
    descripcion: '',
    fecha_publicacion: firebase.firestore.Timestamp.now(),
    fotos: [],
    lugar_publicacion: new firebase.firestore.GeoPoint(0, 0),
    nombre: '',
    raza: ''
  };
  imagePreview: string | null = null;
  selectedRaza: string = '';
  razas = [
    { nombre: 'Labrador Retriever', imagen: 'assets/Imagenes/Perro.png' },
    { nombre: 'Pastor Alemán', imagen: 'assets/Imagenes/Perro.png' },
    // Agrega aquí las demás razas
  ];
  storage = getStorage();
  private subscription: Subscription = Subscription.EMPTY;

  // Constructor del componente, inyecta las dependencias necesarias
constructor(private firestore: Firestore, private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  // Inicializamos publicacionForm con un FormGroup vacío
  this.publicacionForm = this.formBuilder.group({});
}
  
// Método que se ejecuta cuando se inicializa el componente
ngOnInit() {
  // Definimos los campos del formulario en ngOnInit
  this.publicacionForm = this.formBuilder.group({
    descripcion: [''],
    fecha_publicacion: [firebase.firestore.Timestamp.now()],
    fotos: [[]],
    lugar_publicacion: [new firebase.firestore.GeoPoint(0, 0)],
    nombre: [''],
    raza: ['']
  });

  // Nos suscribimos al evento de cierre de sesión exitoso
  this.subscription = this.authService.logoutSuccess.subscribe(() => {
    // Cuando se cierra la sesión, redirigimos al usuario a la galería
    this.router.navigate(['/gallery']);
  });
}

  // Método que se ejecuta cuando se destruye el componente
  ngOnDestroy() {
    // Nos desuscribimos del evento de cierre de sesión exitoso
    this.subscription.unsubscribe();
  }

  // Método para crear una nueva publicación
  async crearPublicacion() {
    try {
      // Añadimos la publicación a la colección de publicaciones en Firestore
      await addDoc(collection(this.firestore, 'publicaciones'), this.publicacionForm.value);
      console.log('Publicación creada exitosamente');
      // Reseteamos el formulario
      this.publicacionForm.reset();
    } catch (error) {
      console.error('Error al crear la publicación: ', error);
    }
  }

  // Método que se ejecuta cuando se selecciona un archivo
  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      // Subimos cada archivo seleccionado
      const uploadPromises = Array.from(files).map(file => this.uploadFile(file));
      Promise.all(uploadPromises).then(urls => {
        // Añadimos las URLs de las imágenes a la publicación
        this.publicacion.fotos.push(...urls);
      }).catch(error => {
        console.error('Error al subir los archivos: ', error);
      });
    }
  }

  // Método para subir un archivo a Firebase Storage
  private uploadFile(file: File): Promise<string> {
    const filePath = `publicaciones/${new Date().getTime()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Leemos el archivo como URL de datos para mostrar una vista previa de la imagen
    const reader = new FileReader();
    reader.onload = e => this.imagePreview = reader.result as string;
    reader.readAsDataURL(file);

    // Mostramos el progreso de la subida en la consola
    uploadTask.on('state_changed', (snapshot) => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percentage);
    });

    // Devolvemos una promesa que se resuelve con la URL de descarga del archivo
    return uploadTask.then(() => getDownloadURL(storageRef)).then(url => url as string);
  }
}