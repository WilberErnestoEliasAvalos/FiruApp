import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export interface Registro {
  uid: string; // La UID de Authentication de la cuenta que se está creando
  address: string; // La dirección del usuario
  fullName: string; // El nombre completo del usuario
  phoneNumber: string; // El número de teléfono del usuario
  profilePicture: string; // La URL de la foto de perfil del usuario
}