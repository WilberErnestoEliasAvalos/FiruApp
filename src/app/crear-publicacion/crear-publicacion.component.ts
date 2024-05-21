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

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})

export class CrearPublicacionComponent implements OnInit, OnDestroy {
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

  constructor(private firestore: Firestore, private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.publicacionForm = this.formBuilder.group({
      descripcion: [''],
      fecha_publicacion: [firebase.firestore.Timestamp.now()],
      fotos: [[]],
      lugar_publicacion: [new firebase.firestore.GeoPoint(0, 0)],
      nombre: [''],
      raza: ['']
    });
  }
  
  ngOnInit() {
    this.subscription = this.authService.logoutSuccess.subscribe(() => {
      this.router.navigate(['/gallery']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async crearPublicacion() {
    try {
      await addDoc(collection(this.firestore, 'publicaciones'), this.publicacionForm.value);
      console.log('Publicación creada exitosamente');
      this.publicacionForm.reset();
    } catch (error) {
      console.error('Error al crear la publicación: ', error);
    }
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const uploadPromises = Array.from(files).map(file => this.uploadFile(file));
      Promise.all(uploadPromises).then(urls => {
        this.publicacion.fotos.push(...urls);
      });
    }
  }

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

    return uploadTask.then(() => getDownloadURL(storageRef)).then(url => url as string);
  }
}