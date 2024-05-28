import { GeoPoint, Timestamp } from 'firebase/firestore';

export interface Publicacion {
  id: string;
  descripcion: string;
  fecha_publicacion: Timestamp;
  fotos: string[];
  lugar_publicacion: GeoPoint;
  nombre: string;
  raza: string;
  userId: string;
  tipo_mascota: string;
}