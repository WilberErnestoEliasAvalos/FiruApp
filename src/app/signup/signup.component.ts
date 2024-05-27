// Importamos las dependencias necesarias
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, updateDoc, getDocs } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

// Función para validar que dos campos coincidan
function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
// Decorador de Componente, define metadatos para el componente
@Component({
  selector: 'app-signup', // Selector CSS para usar este componente
  templateUrl: './signup.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./signup.component.css'] // Rutas a los archivos de estilos CSS
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup; // Formulario de registro
  imagePreview: string | ArrayBuffer = ''; // Vista previa de la imagen
  selectedFile: File | null = null; // Archivo seleccionado

  // Constructor del componente, inyecta las dependencias necesarias
  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario de registro
    this.signupForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          ],
        ],
        confirmPassword: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{8}$')],
        ],
        address: ['', Validators.required],
        profilePicture: ['', [Validators.required, this.imageValidator]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }
  // Método para manejar el cambio de archivo
onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  // Verifica si se seleccionó un archivo
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    // Define los tipos de imagen válidos
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    // Verifica si el tipo de archivo es válido
    if (!validImageTypes.includes(file.type)) {
      alert('Tipo de imagen inválido. Por favor, selecciona una imagen GIF, JPEG o PNG.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      // Cuando se carga el archivo, guarda la vista previa de la imagen y el archivo seleccionado
      if (reader.result) {
        this.imagePreview = reader.result;
        this.selectedFile = file;
      }
    };
    // Lee el archivo como URL de datos
    reader.readAsDataURL(file);
  }
}

// Validador de imagen
imageValidator(control: AbstractControl): { [key: string]: any } | null {
  const file = control.value;
  // Verifica si se seleccionó un archivo
  if (!file) {
    return { required: true };
  }
  return null;
}

// Método para manejar el envío del formulario
async onSubmit(): Promise<void> {
  // Define los nombres de los campos
  const fieldNames = {
    fullName: 'Nombres y Apellidos',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmación de Contraseña',
    phoneNumber: 'Número de Teléfono',
    address: 'Dirección',
    profilePicture: 'Foto de Perfil'
  };

  // Verifica si el formulario es válido
  if (this.signupForm.invalid) {
    let message = 'Este campo necesita de su atención: ';
    const controls = this.signupForm.controls;
    // Busca los campos inválidos
    for (const control in controls) {
      if (controls[control].errors) {
        message += (fieldNames as any)[control] + ', ';
      }
    }
    message = message.slice(0, -2);
    alert(message);
    return;
  }

  try {
    const { email, password, confirmPassword, ...rest } = this.signupForm.value;

    // Verifica si el correo ya está en uso
    const users = collection(this.firestore, 'registros');
    const userSnapshot = await getDocs(users);
    const emailExists = userSnapshot.docs.some(doc => doc.data()['email'] === email);

    if (emailExists) {
      alert('Ya hay una cuenta creada con este correo');
      return;
    }

    // Crea el usuario
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const { user } = userCredential;

    // Enviar correo de verificación
    if (user) {
      await sendEmailVerification(user);
      alert('CUENTA CREADA EXITOSAMENTE. Se ha enviado un correo de verificación a tu dirección de correo electrónico. Por favor, verifica tu correo electrónico.');
    }

    // Inicia la sesión del usuario
    await signInWithEmailAndPassword(this.auth, email, password);

    // Usa la UID de Authentication como el ID del documento
    const docRef = doc(this.firestore, 'registros', user?.uid);

    // Guarda el resto del formulario en Firestore
    await setDoc(docRef, { ...rest, uid: user?.uid });

    // Guarda la foto de perfil en Firebase Storage
    if (this.selectedFile) {
      const filePath = `foto-perfil/${user?.uid}`;
      const fileRef = ref(this.storage, filePath);
      await uploadBytes(fileRef, this.selectedFile);

      // Obtén la URL de la imagen y guárdala en Firestore
      const url = await getDownloadURL(fileRef);
      await updateDoc(docRef, { profilePicture: url });
    }
    // Redirige al usuario a la galería
    this.router.navigate(['/gallery']);
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Ya hay una cuenta creada con este correo');
    } else {
      console.error('Error al crear la cuenta de usuario:', error);
    }
  }
}
}
