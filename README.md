# 💿 Task Organizer

Task Organizer es una aplicación web para la gestion de tareas. En ella podremos crear, editar, eliminar tareas, organizarlas por categorias y clasificarlas por prioridad.

## 📋 Tabla de Contenidos

1. [Características](#-características)
2. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
3. [Instalación](#-instalación)
4. [Uso](#-uso)
5. [Endpoints](#-endpoints)
6. [Colaboradores](#-colaboradores)


## 🌟 Características

-   Registro y autenticación de usuarios.
-   Añadir, editar y eliminar tareas.

## 🛠️ Tecnologías Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)

## ⚙️ Instalación

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/kareaga95/gestion-tareas-front2

    ```

     ```bash
    git clone https://github.com/kareaga95/gestion-tareas-backend2

    ```

2. **Crear archivo '.env'**

    Utilizando el '.env.example' crea el archivo '.env' y añade las variables de entorno

    ```plaintext
        MONGO_HOST=mongo_gestion_tareas
        MONGO_USER=user
        MONGO_PASSWORD=1234
        MONGO_DATABASE=gestion_tareas
        MONGO_PORT=27017

        APP_HOST=express_gestion_tareas
        APP_PORT=3002

        JWT_SECRET=secretoJWTMikel
        SESSION_SECRET=secretSessionMikel
    ```

3. **Inicia el contenedor de docker**:

    Entra en la carpeta del proyecto y usa este comando para crear el contenedor

    ```bash
    docker compose up --build
    ```

4. **Disfruta de la app :)**

## 🚀 Uso

1. **Inicio de Sesión o Registro**:
    - Ingresa con tu usuario y contraseña si ya tienes una cuenta.
    - Si no tienes cuenta, regístrate rápidamente con tus datos personales.

2. **Gestion de Tareas**:
    - Accede a la ventana de listado de tareas.
    - Podras editar, eliminar tareas.
    - Desde navbar podras crear nuevas tareas.

## 📌 Endpoints

/auth/login

/auth/register

/tasks

/tasks/user/:userId

/tasks/category/:category

/tasks/:id

/tasks/:id/delete

/users

/users/new

/users/:id/update

/users/:id

/users/email/:email