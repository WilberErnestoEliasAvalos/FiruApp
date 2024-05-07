# FiruPets

Este proyecto es una aplicación web desarrollada con Angular que actúa como un servicio para la adopción de mascotas. Permite a los usuarios publicar mascotas que desean dar en adopción y a otros usuarios adoptarlas.

## Funcionalidades

- **Registro y Autenticación de Usuarios:** Los usuarios pueden registrarse, iniciar sesión y cerrar sesión en la aplicación.
- **Publicación de Mascotas:** Los usuarios pueden publicar información sobre mascotas que desean dar en adopción, incluyendo detalles como nombre, raza, descripción y ubicación.
- **Búsqueda de Mascotas:** Los usuarios pueden buscar mascotas disponibles para adopción utilizando filtros como nombre, raza y ubicación.
- **Adopción de Mascotas:** Los usuarios pueden ver información detallada sobre las mascotas disponibles para adopción y solicitar adoptarlas.
- **Interacción con las Publicaciones:** Los usuarios pueden ver detalles completos de una publicación, comentar en las publicaciones y contactar con el propietario para obtener más información sobre la mascota.

## Tecnologías Utilizadas

- Angular
- Firebase (Firestore para la base de datos y Firebase Authentication para la autenticación de usuarios)

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/WilberErnestoEliasAvalos/FiruApp
```

2. Instala las dependencias:
```bash
cd firu-pets
npm install
```

3. Configura Firebase:
Crea un proyecto en Firebase y configura la base de datos Firestore y la autenticación de usuarios.
Agrega la configuración de Firebase al archivo app.module.ts en el directorio src/.

4. Ejecuta la aplicación:

```bash
ng serve
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
