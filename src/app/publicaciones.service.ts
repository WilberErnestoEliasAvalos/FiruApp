// Importamos los módulos necesarios de Angular y Firebase
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp, collection, addDoc, setDoc, updateDoc, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { Publicacion } from './publicacion.model';


// Usamos el decorador Injectable para definir metadatos para el servicio
@Injectable({
  providedIn: 'root' // Este servicio se proporciona en el nivel de raíz de la aplicación
})
export class PublicacionesService {
  private firestore;
  // Inyectamos Firestore en el constructor
  constructor() {
    const app = initializeApp({ /* your config */ });
    this.firestore = getFirestore(app);
  }

  // Método para obtener todas las publicaciones
  async getPublicaciones() {
    // Obtenemos todas las publicaciones de la colección 'publicaciones' en Firestore
    const querySnapshot = await getDocs(collection(this.firestore, 'publicaciones'));
    // Mapeamos los documentos a objetos de tipo Publicacion y los devolvemos
    return querySnapshot.docs.map(doc => doc.data()) as Publicacion[];
  }

  // Método para obtener una publicación por su ID
  async getPublicacionById(id: string) {
    // Creamos una referencia al documento con el ID proporcionado en la colección 'publicaciones'
    const document = doc(this.firestore, 'publicaciones', id);
    // Obtenemos el documento
    const documentSnapshot = await getDoc(document);
    // Si el documento existe, devolvemos sus datos. Si no, devolvemos null
    return documentSnapshot.exists() ? documentSnapshot.data() : null;
  }

  // Método para crear una nueva publicación
  async crearPublicacion(publicacion: Publicacion) {
  // Creamos un documento con un ID aleatorio en la colección 'publicaciones'
  const documentRef = doc(collection(this.firestore, 'publicaciones'));
  // Creamos el ID de la publicación con el formato requerido
  const pubId = `pub_${documentRef.id}`;
  // Añadimos el ID de la publicación al documento y lo guardamos en Firestore
  await setDoc(documentRef, { 
    ...publicacion, 
    id: pubId, 
    fecha_publicacion: Timestamp.now(),
    tipo_mascota: publicacion.tipo_mascota,
    estado: 'Visible'
  });
}

  // Método para actualizar una publicación existente
  async actualizarPublicacion(id: string, datos: any) {
    // Creamos una referencia al documento con el ID proporcionado en la colección 'publicaciones'
    const document = doc(this.firestore, 'publicaciones', id);
    // Actualizamos el documento con los datos proporcionados
    await updateDoc(document, datos);
  }

  // Método para eliminar una publicación existente
  async eliminarPublicacion(id: string) {
    // Creamos una referencia al documento con el ID proporcionado en la colección 'publicaciones'
    const document = doc(this.firestore, 'publicaciones', id);
    // Eliminamos el documento
    await deleteDoc(document);
  }
}