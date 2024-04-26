import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export interface Publicacion {
  descripcion: string;
  fecha_publicacion: firebase.firestore.Timestamp; // Utiliza el tipo Timestamp de Firebase
  fotos: string[]; // Array de cadenas para las URLs de las fotos
  lugar_publicacion: firebase.firestore.GeoPoint; // Utiliza el tipo GeoPoint de Firebase
  nombre?: string; // Campo opcional, ya que puede no haber un nombre
  raza?: string; // Campo opcional, ya que puede no haber una raza
}
