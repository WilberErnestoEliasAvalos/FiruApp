// Importamos las dependencias necesarias
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { addDoc, collection, Firestore, GeoPoint, Timestamp } from '@angular/fire/firestore';
import { Publicacion } from '../publicacion.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

// Decorador de Componente, define metadatos para el componente
@Component({
  selector: 'app-crear-publicacion', // Selector CSS para usar este componente
  templateUrl: './crear-publicacion.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./crear-publicacion.component.css'] // Rutas a los archivos de estilos CSS
})
export class CrearPublicacionComponent implements OnInit, OnDestroy {
  public animalSeleccionado: string | null = null;
  publicacionForm: FormGroup;
  publicacion: Publicacion = {
    id: uuidv4(), // Genera un ID único para la nueva publicación
    descripcion: '',
    fecha_publicacion: Timestamp.now(),
    fotos: [],
    lugar_publicacion: new GeoPoint(0, 0),
    nombre: '',
    raza: '',
    userId: '', // Asegúrate de establecer esto al UID del usuario autenticado
    tipo_mascota: '' // Asegúrate de establecer esto al tipo de mascota seleccionado
  };
  imagePreview: string | null = null;
  selectedRaza: string = '';
  razas = ['Basset Hound', 'Chihuahua', 'Pitbull', 'Gran Danes', 'Maltipoo', 'Criollo, Mestizo o Aguacatero'];
  storage = getStorage();
  private subscription: Subscription = Subscription.EMPTY;

  // Constructor del componente, inyecta las dependencias necesarias
  constructor(private firestore: Firestore, private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.publicacionForm = this.formBuilder.group({});
  }
  
  // Método que se ejecuta cuando se inicializa el componente
  ngOnInit() {
    this.publicacionForm = this.formBuilder.group({
      fotos: ['', Validators.required],
      tieneNombre: [true],
      nombre: ['', [Validators.required, Validators.pattern('^(\w+\s?){1,4}$')]],
      descripcion: ['', Validators.required],
      raza: [''],
      tipo_mascota: ['', Validators.required] // Añadido el campo tipo_mascota
    });

  // Nos suscribimos al evento de cierre de sesión exitoso
  this.subscription = this.authService.logoutSuccess.subscribe(() => {
    this.router.navigate(['/gallery']);
  });
}

  // Método que se ejecuta cuando se destruye el componente
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Método para crear una nueva publicación
  async crearPublicacion() {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      try {
        await addDoc(collection(this.firestore, 'publicaciones'), {
          ...this.publicacionForm.value,
          userId: user.uid, // Aquí obtenemos el UID del usuario autenticado
          fecha_publicacion: Timestamp.now(),
        });
        console.log('Publicación creada exitosamente');
        this.publicacionForm.reset();
      } catch (error) {
        console.error('Error al crear la publicación: ', error);
      }
    } else {
      console.error('No user is signed in.');
    }
  }

  // Método que se ejecuta cuando se selecciona un archivo
  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const uploadPromises = Array.from(files).map(file => this.uploadFile(file));
      Promise.all(uploadPromises).then(urls => {
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

    const reader = new FileReader();
    reader.onload = e => this.imagePreview = reader.result as string;
    reader.readAsDataURL(file);

    uploadTask.on('state_changed', (snapshot) => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percentage);
    });

    // Devolvemos una promesa que se resuelve con la URL de descarga del archivo
    return uploadTask.then(() => getDownloadURL(storageRef)).then(url => url as string);
  }

  toggleNombre(event: Event): void {
    let nombreControl = this.publicacionForm.get('nombre');
    if (nombreControl) {
      if (!(event.target as HTMLInputElement).checked) {
        nombreControl.setValue('Sin Nombre');
        nombreControl.disable();
      } else {
        nombreControl.enable();
      }
    }
  }
}