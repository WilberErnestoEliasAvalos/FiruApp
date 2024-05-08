import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, setDoc, updateDoc, deleteDoc, doc, getDoc, getDocs, DocumentData } from '@angular/fire/firestore';
import { Publicacion } from './publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(private firestore: Firestore) { }

  // Método para obtener todas las publicaciones
  async getPublicaciones() {
    const querySnapshot = await getDocs(collection(this.firestore, 'publicaciones'));
    return querySnapshot.docs.map(doc => doc.data()) as Publicacion[];
  }

  // Método para obtener una publicación por su ID
  async getPublicacionById(id: string) {
    const document = doc(this.firestore, 'publicaciones', id);
    const documentSnapshot = await getDoc(document);
    return documentSnapshot.exists() ? documentSnapshot.data() : null;
  }

  // Método para crear una nueva publicación
  async crearPublicacion(publicacion: Publicacion) {
    const documentRef = doc(collection(this.firestore, 'publicaciones')); // Crear un documento con un ID aleatorio
    const pubId = `pub_${documentRef.id}`; // Crear el ID de la publicación con el formato requerido
    await setDoc(documentRef, { ...publicacion, id: pubId }); // Añadir el ID de la publicación al documento
  }

  // Método para actualizar una publicación existente
  async actualizarPublicacion(id: string, datos: any) {
    const document = doc(this.firestore, 'publicaciones', id);
    await updateDoc(document, datos);
  }

  // Método para eliminar una publicación existente
  async eliminarPublicacion(id: string) {
    const document = doc(this.firestore, 'publicaciones', id);
    await deleteDoc(document);
  }
}