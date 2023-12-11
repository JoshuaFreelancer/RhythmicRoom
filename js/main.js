// main.js

// Ejemplo de cómo realizar una solicitud a la API de Last.fm
const apiKey = 'TU_CLAVE_DE_API';
const apiUrl = 'http://ws.audioscrobbler.com/2.0/';

// Ejemplo: Obtener información de artistas
fetch(`${apiUrl}?method=artist.getInfo&artist=Coldplay&api_key=${apiKey}&format=json`)
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta de la API y actualizar el contenido en la sección de artistas
        const artistSection = document.getElementById('artistas');
        artistSection.innerHTML = `<h2>${data.artist.name}</h2>
                                   <p>${data.artist.bio.summary}</p>`;
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));
