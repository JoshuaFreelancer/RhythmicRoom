# RhythmicRoom: Tu Puerta a la Música

## Descripción del Proyecto

RhythmicRoom es una plataforma diseñada para que los amantes de la música descubran, disfruten y se conecten con sus canciones favoritas. Desde artistas destacados hasta listas de reproducción personalizadas, esta aplicación busca ofrecer la armonía perfecta para cada momento.

### Introducción

RhythmicRoom es una aplicación web que utiliza diversas tecnologías para proporcionar una experiencia musical personalizada. Esta documentación te guiará a través de los pasos necesarios para clonar y poner en funcionamiento el proyecto.

### Requisitos Previos

Asegúrate de tener instalado:

- Node.js
- npm (Gestor de paquetes de Node.js)

### Clonar el Proyecto

```bash
git clone https://github.com/JoshuaFreelancer/RhythmicRoom.git
cd RhythmicRoom
```

cd (la ruta donde clonaste el proyecto)

## Instalación de Dependencias

 Instala las dependencias (No necesario para abrir en el navegador solo para el webpack)
 
npm install

## Cambiar claves

 Recuerda registrarte en la página de Last.fm para usar la API dentro del código. En la carpeta api/lastFmAPI.js, tienes que editar la línea:

```bash
const apiKey = ''; // Reemplazar por tu clave de la API de Last.fm
```

## Iniciar la Aplicación
Abre el archivo index.html en tu navegador.

## API Utilizada
El proyecto utiliza la API de Last.fm, que proporciona acceso a un amplio catálogo de música, artistas y listas de reproducción. Puedes obtener más información sobre esta API en (https://www.last.fm/home).

## Funcionalidades Destacadas

- Descubrimiento Musical: Explora nuevos artistas y géneros musicales.
- Buscador de Álbumes, Artistas y Música: Encuentra fácilmente tus álbumes y artistas favoritos.
- Visualización de Listas de Canciones: Consulta las canciones de un álbum o artista específico.
- Top Tracks y Artistas: Descubre las canciones y artistas más populares del momento.
- Etiquetas Musicales: Explora música por etiquetas, facilitando la búsqueda de géneros específicos.

