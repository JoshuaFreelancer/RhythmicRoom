// main.js
  
document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'http://ws.audioscrobbler.com/2.0/';
    const apiKey = 'f04f441ada53ca5ad2085e02660c2406';

    fetch(`${apiUrl}?method=chart.getTopTracks&api_key=${apiKey}&format=json&limit=8&period=year`)
        .then(response => response.json())
        .then(data => {
            const chartContainer = document.getElementById("chartContainer");
            const chartWrapper = document.getElementById("chartWrapper");

            // Limpiar el contenedor antes de dibujar la gráfica
            chartWrapper.innerHTML = '';

            // Crear el contenedor de las barras
            const barContainer = document.createElement("div");
            barContainer.classList.add("chart-bar-container");

            // Crear elementos HTML para la gráfica
            data.tracks.track.forEach(track => {
                // Obtener información detallada sobre la pista
                fetch(`${apiUrl}?method=track.getInfo&api_key=${apiKey}&artist=${track.artist.name}&track=${track.name}&format=json`)
                    .then(response => response.json())
                    .then(trackInfo => {
                        const bar = document.createElement("div");
                        bar.classList.add("chart-bar");
                        bar.style.height = `${(track.playcount / Math.max(...data.tracks.track.map(t => t.playcount))) * 100}%`;

                        const label = document.createElement("div");
                        label.classList.add("chart-label");
                        label.innerText = track.name;

                        const image = document.createElement("img");
                        image.classList.add("chart-image");
                        // Verificar si la URL de la imagen está disponible
                        image.src = trackInfo.track.album.image[2]['#text'] || 'placeholder.jpg'; // Puedes usar una imagen de marcador de posición
                        image.alt = track.name;

                        bar.appendChild(label);
                        bar.appendChild(image);
                        barContainer.appendChild(bar);
                    })
                    .catch(error => console.error('Error al obtener información de la pista:', error));
            });

            // Agregar el contenedor de barras al contenedor principal
            chartWrapper.appendChild(barContainer);
        })
        .catch(error => console.error('Error al obtener datos de la API (Temas en alza):', error));


    // Ejemplo de cómo realizar una solicitud a la API de Last.fm para obtener información de artistas
    const artistSection = document.getElementById('artistas');

    fetch(`${apiUrl}?method=artist.getInfo&artist=Coldplay&api_key=${apiKey}&format=json`)
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta de la API y actualizar el contenido en la sección de artistas
            artistSection.innerHTML = `<h2>${data.artist.name}</h2>
                                       <p>${data.artist.bio.summary}</p>`;
        })
        .catch(error => console.error('Error al obtener datos de la API (Artistas):', error));
});

// Función para dibujar la gráfica
function drawChart(songNames, chartData) {
    const chartWrapper = document.getElementById("chartWrapper");

    // Limpiar el contenedor antes de dibujar la gráfica
    chartWrapper.innerHTML = '';

    // Crear el contenedor de las barras
    const barContainer = document.createElement("div");
    barContainer.classList.add("chart-bar-container");

    // Crear elementos HTML para la gráfica
    chartData.forEach((popularity, index) => {
        const bar = createChartBar(popularity, songNames[index]);
        barContainer.appendChild(bar);
    });

    // Agregar el contenedor de barras al contenedor principal
    chartWrapper.appendChild(barContainer);
}

// Función para crear una barra individual
function createChartBar(popularity, label, track) {
    const bar = document.createElement("div");
    bar.classList.add("chart-bar");
    bar.style.height = `${(popularity / Math.max(...chartData)) * 100}%`; // Ajuste para la altura de las barras

    const chartLabel = document.createElement("div");
    chartLabel.classList.add("chart-label");
    chartLabel.innerText = label;

    const image = document.createElement("img");
    image.classList.add("chart-image");

    // Verificamos si 'track' está definido y si tiene la propiedad 'image'
    if (track && track.image && Array.isArray(track.image) && track.image.length > 2) {
        image.src = track.image[2]['#text'];
    } else {
        // Si no hay imagen disponible, puedes mostrar una imagen de reemplazo o dejarlo vacío
        image.src = '../images/Placeholder.png';
    }

    image.alt = label;

    bar.appendChild(chartLabel);
    bar.appendChild(image);

    return bar;
}

document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'http://ws.audioscrobbler.com/2.0/';
    const apiKey = 'f04f441ada53ca5ad2085e02660c2406';

    // Obtener los datos de los artistas principales
    fetch(`${apiUrl}?method=chart.getTopArtists&api_key=${apiKey}&format=json&limit=5`)
        .then(response => response.json())
        .then(data => {
            const artistCarousel = document.getElementById("artistCarousel");

            // Crear elementos HTML para cada artista en el carrusel
            data.artists.artist.forEach(artist => {
                createArtistCard(artist, apiKey, apiUrl)
                    .then(artistCard => {
                        // Agregar la tarjeta del artista al carrusel
                        artistCarousel.appendChild(artistCard);
                    })
                    .catch(error => console.error('Error al crear la tarjeta del artista:', error));
            });
        })
        .catch(error => console.error('Error al obtener datos de la API (Top Artistas):', error));

    // Resto del código relacionado con la API de Last.fm (variables apiUrl, apiKey, etc.)
});

document.addEventListener("DOMContentLoaded", function () {
    // ... (tu código existente)

    // Crear un contenedor para los videos de YouTube
    const youtubeContainer = document.getElementById("youtubeContainer");

    // Agregar videos de YouTube al contenedor
    const youtubeVideos = [
        "Y4M6Nm5UQOU",
        // Agrega más IDs de videos según sea necesario
    ];

    youtubeVideos.forEach(videoId => {
        const youtubeEmbed = document.createElement("iframe");
        youtubeEmbed.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1`;
        youtubeEmbed.width = 510; // Ajusta el tamaño según tus preferencias
        youtubeEmbed.height = 325; // Ajusta el tamaño según tus preferencias
        youtubeEmbed.allowFullscreen = true;
        youtubeContainer.appendChild(youtubeEmbed);
    });

    // ... (resto de tu código existente)
});

document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'http://ws.audioscrobbler.com/2.0/';
    const apiKey = 'f04f441ada53ca5ad2085e02660c2406';

    // Obtener los datos de los artistas principales
    fetch(`${apiUrl}?method=chart.getTopArtists&api_key=${apiKey}&format=json&limit=10`)
        .then(response => response.json())
        .then(data => {
            const artistCarousel = document.getElementById("artistCarousel");

            // Crear elementos HTML para cada artista en el carrusel
            data.artists.artist.forEach(artist => {
                createArtistCard(artist, apiKey, apiUrl, artistCarousel)
                    .then(artistCard => {
                        // Agregar la tarjeta del artista al carrusel
                        artistCarousel.appendChild(artistCard);
                    })
                    .catch(error => console.error('Error al crear la tarjeta del artista:', error));
            });
        })
        .catch(error => console.error('Error al obtener datos de la API (Top Artistas):', error));
});

// Función para crear una tarjeta de artista
async function createArtistCard(artist, apiKey, apiUrl, artistCarousel) {
    return new Promise(async (resolve, reject) => {
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card");

        try {
            // Obtener los álbumes más populares del artista
            const topAlbumsResponse = await fetch(`${apiUrl}?method=artist.getTopAlbums&api_key=${apiKey}&artist=${encodeURIComponent(artist.name)}&format=json&limit=1`);
            const topAlbumsData = await topAlbumsResponse.json();

            // Verificar si ya se ha agregado este álbum
            if (!isAlbumDuplicate(topAlbumsData.topalbums.album, artistCarousel)) {
                // Extraer la imagen del artista desde uno de los álbumes
                const image = document.createElement("img");
                const imageUrl = topAlbumsData.topalbums.album[0].image[3]['#text']; // Utilizamos la imagen de mayor calidad disponible

                if (imageUrl) {
                    image.src = imageUrl;
                    image.alt = artist.name;
                } else {
                    // Si la URL de la imagen no está disponible, puedes usar una imagen de marcador de posición
                    image.src = 'placeholder.jpg';
                    image.alt = 'Placeholder';
                }

                const artistName = document.createElement("p");
                artistName.innerText = artist.name;

                artistCard.appendChild(image);
                artistCard.appendChild(artistName);

                resolve(artistCard);
            } else {
                // Si el álbum ya está en el carrusel, resolvemos con null para indicar que no se debe agregar
                resolve(null);
            }
        } catch (error) {
            reject(error);
        }
    });
}

// Función para verificar si un álbum ya está en el carrusel
function isAlbumDuplicate(albumData, artistCarousel) {
    const albumNames = new Set(Array.from(artistCarousel.querySelectorAll('.artist-card p')).map(p => p.innerText));
    return albumNames.has(albumData[0].name);
}



// Resto del código relacionado con la API de Last.fm (variables apiUrl, apiKey, etc.)
