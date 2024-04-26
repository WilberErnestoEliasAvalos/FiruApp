import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, getDocs, DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(private firestore: Firestore) { }

  // Método para obtener todas las publicaciones
  async getPublicaciones() {
    const querySnapshot = await getDocs(collection(this.firestore, 'publicaciones'));
    return querySnapshot.docs.map(doc => doc.data()) as DocumentData[];
  }

  // Método para obtener una publicación por su ID
  async getPublicacionById(id: string) {
    const document = doc(this.firestore, 'publicaciones', id);
    const documentSnapshot = await getDoc(document);
    return documentSnapshot.exists() ? documentSnapshot.data() : null;
  }

  // Método para crear una nueva publicación
  async crearPublicacion(publicacion: any) {
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
