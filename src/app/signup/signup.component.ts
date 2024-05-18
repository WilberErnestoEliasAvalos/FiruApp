import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

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
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  imagePreview: string | ArrayBuffer = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      address: ['', Validators.required],
      profilePicture: ['', [Validators.required, this.imageValidator]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

  }
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        if (reader.result) {
          this.imagePreview = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  imageValidator(control: AbstractControl): { [key: string]: any } | null {
    const file = control.value;
    if (file && file.length > 1) {
      return { 'tooManyImages': true };
    }
    return null;
  }

  async onSubmit(): Promise<void> {
    const { email, password, ...rest } = this.signupForm.value;

    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const { user } = userCredential;

    // Guardar el resto del formulario en Firestore
    const docRef = doc(this.firestore, 'registros', user?.uid);
    await setDoc(docRef, rest);

    // Guardar la foto de perfil en Firebase Storage
    const filePath = `foto-perfil/${user?.uid}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, rest.profilePicture);

    // Obtener la URL de la imagen y guardarla en Firestore
    const url = await getDownloadURL(fileRef);
await updateDoc(docRef, { profilePicture: url });
  }

}