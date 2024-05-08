import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, setDoc, updateDoc, deleteDoc, doc, getDoc, getDocs, DocumentData, query, where } from '@angular/fire/firestore';
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

// Método para obtener todas las publicaciones de un usuario
async getPublicacionesByUserId(userId: string) {
  const querySnapshot = await getDocs(query(collection(this.firestore, 'publicaciones'), where('userId', '==', userId)));
  return querySnapshot.docs.map(doc => doc.data()) as Publicacion[];
}

// Método para crear una nueva publicación
async crearPublicacion(publicacion: Publicacion, userId: string) {
  if (publicacion.descripcion.trim() === '') {
    throw new Error('La descripción no puede estar vacía');
  }

  publicacion.userId = userId; // Asignar el ID de usuario a la publicación
  await addDoc(collection(this.firestore, 'publicaciones'), publicacion);
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