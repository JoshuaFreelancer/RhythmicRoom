// main.js

document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "http://ws.audioscrobbler.com/2.0/";
  const apiKey = "f04f441ada53ca5ad2085e02660c2406";

  // Cargar las canciones en alza al iniciar la página
  fetch(
    `${apiUrl}?method=chart.getTopTracks&api_key=${apiKey}&format=json&limit=8&period=year`
  )
    .then((response) => response.json())
    .then((data) => {
      const chartContainer = document.getElementById("chartContainer");
      const chartWrapper = document.getElementById("chartWrapper");

      // Limpiar el contenedor antes de dibujar la gráfica
      chartWrapper.innerHTML = "";

      // Crear el contenedor de las barras
      const barContainer = document.createElement("div");
      barContainer.classList.add("chart-bar-container");

      // Crear elementos HTML para la gráfica
      data.tracks.track.forEach((track) => {
        // Obtener información detallada sobre la pista
        fetch(
          `${apiUrl}?method=track.getInfo&api_key=${apiKey}&artist=${track.artist.name}&track=${track.name}&format=json`
        )
          .then((response) => response.json())
          .then((trackInfo) => {
            const bar = document.createElement("div");
            bar.classList.add("chart-bar");
            bar.style.height = `${
              (track.playcount /
                Math.max(...data.tracks.track.map((t) => t.playcount))) *
              100
            }%`;

            const label = document.createElement("div");
            label.classList.add("chart-label");
            label.innerText = track.name;

            const image = document.createElement("img");
            image.classList.add("chart-image");
            image.src =
              trackInfo.track.album.image[2]["#text"] || "placeholder.jpg";
            image.alt = track.name;

            bar.appendChild(label);
            bar.appendChild(image);
            barContainer.appendChild(bar);
          })
          .catch((error) =>
            console.error("Error al obtener información de la pista:", error)
          );
      });

      // Agregar el contenedor de barras al contenedor principal
      chartWrapper.appendChild(barContainer);
    })
    .catch((error) =>
      console.error("Error al obtener datos de la API (Temas en alza):", error)
    );

  // Ejemplo de cómo realizar una solicitud a la API de Last.fm para obtener información de artistas
  const artistSection = document.getElementById("artistas");

  fetch(
    `${apiUrl}?method=artist.getInfo&artist=Coldplay&api_key=${apiKey}&format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      artistSection.innerHTML = `<h2>${data.artist.name}</h2>
                                       <p>${data.artist.bio.summary}</p>`;
    })
    .catch((error) =>
      console.error("Error al obtener datos de la API (Artistas):", error)
    );
});

// Función para dibujar la gráfica
function drawChart(songNames, chartData) {
  const chartWrapper = document.getElementById("chartWrapper");

  // Limpiar el contenedor antes de dibujar la gráfica
  chartWrapper.innerHTML = "";

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
  bar.style.height = `${(popularity / Math.max(...chartData)) * 100}%`;

  const chartLabel = document.createElement("div");
  chartLabel.classList.add("chart-label");
  chartLabel.innerText = label;

  const image = document.createElement("img");
  image.classList.add("chart-image");

  if (
    track &&
    track.image &&
    Array.isArray(track.image) &&
    track.image.length > 2
  ) {
    image.src = track.image[2]["#text"];
  } else {
    image.src = "../images/Placeholder.png";
  }

  image.alt = label;

  bar.appendChild(chartLabel);
  bar.appendChild(image);

  return bar;
}

// Cargar los artistas principales al iniciar la página
document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "http://ws.audioscrobbler.com/2.0/";
  const apiKey = "f04f441ada53ca5ad2085e02660c2406";

  fetch(
    `${apiUrl}?method=chart.getTopArtists&api_key=${apiKey}&format=json&limit=5`
  )
    .then((response) => response.json())
    .then((data) => {
      const artistCarousel = document.getElementById("artistCarousel");

      data.artists.artist.forEach((artist) => {
        createArtistCard(artist, apiKey, apiUrl)
          .then((artistCard) => {
            artistCarousel.appendChild(artistCard);
          })
          .catch((error) =>
            console.error("Error al crear la tarjeta del artista:", error)
          );
      });
    })
    .catch((error) =>
      console.error("Error al obtener datos de la API (Top Artistas):", error)
    );
});

// Crear un contenedor para los videos de YouTube
document.addEventListener("DOMContentLoaded", function () {
  const youtubeContainer = document.getElementById("youtubeContainer");

  const youtubeVideos = [
    "Y4M6Nm5UQOU",
    // Agrega más IDs de videos según sea necesario
  ];

  youtubeVideos.forEach((videoId) => {
    const youtubeEmbed = document.createElement("iframe");
    youtubeEmbed.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1`;
    youtubeEmbed.width = 510;
    youtubeEmbed.height = 325;
    youtubeEmbed.allowFullscreen = true;
    youtubeContainer.appendChild(youtubeEmbed);
  });
});

// Cargar más artistas al iniciar la página
document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "http://ws.audioscrobbler.com/2.0/";
  const apiKey = "f04f441ada53ca5ad2085e02660c2406";

  fetch(
    `${apiUrl}?method=chart.getTopArtists&api_key=${apiKey}&format=json&limit=10`
  )
    .then((response) => response.json())
    .then((data) => {
      const artistCarousel = document.getElementById("artistCarousel");

      data.artists.artist.forEach((artist) => {
        createArtistCard(artist, apiKey, apiUrl, artistCarousel)
          .then((artistCard) => {
            artistCarousel.appendChild(artistCard);
          })
          .catch((error) =>
            console.error("Error al crear la tarjeta del artista:", error)
          );
      });
    })
    .catch((error) =>
      console.error("Error al obtener datos de la API (Top Artistas):", error)
    );
});

// Función para crear una tarjeta de artista
async function createArtistCard(artist, apiKey, apiUrl, artistCarousel) {
  return new Promise(async (resolve, reject) => {
    const artistCard = document.createElement("div");
    artistCard.classList.add("artist-card");

    try {
      const topAlbumsResponse = await fetch(
        `${apiUrl}?method=artist.getTopAlbums&api_key=${apiKey}&artist=${encodeURIComponent(
          artist.name
        )}&format=json&limit=1`
      );
      const topAlbumsData = await topAlbumsResponse.json();

      if (!isAlbumDuplicate(topAlbumsData.topalbums.album, artistCarousel)) {
        const image = document.createElement("img");
        const imageUrl = topAlbumsData.topalbums.album[0].image[3]["#text"];

        if (imageUrl) {
          image.src = imageUrl;
          image.alt = artist.name;
        } else {
          image.src = "placeholder.jpg";
          image.alt = "Placeholder";
        }

        const artistName = document.createElement("p");
        artistName.innerText = artist.name;

        artistCard.appendChild(image);
        artistCard.appendChild(artistName);

        resolve(artistCard);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
}

// Función para verificar si un álbum ya está en el carrusel
function isAlbumDuplicate(albumData, artistCarousel) {
  const albumNames = new Set(
    Array.from(artistCarousel.querySelectorAll(".artist-card p")).map(
      (p) => p.innerText
    )
  );
  return albumNames.has(albumData[0].name);
}

// Función para cargar los generos en la seccion musica
async function loadMusicGenres() {
  const apiUrl = "http://ws.audioscrobbler.com/2.0/";
  const apiKey = "f04f441ada53ca5ad2085e02660c2406";

  try {
    const response = await fetch(
      `${apiUrl}?method=tag.getTopTags&api_key=${apiKey}&format=json`
    );
    const data = await response.json();

    const genresContainer = document.getElementById("musicGenresContainer");
    genresContainer.innerHTML = "";

    const genresList = document.createElement("ul");
    genresList.classList.add("genres-list");

    data.toptags.tag.forEach((tag) => {
      const genreItem = document.createElement("li");
      genreItem.classList.add("genre-item");

      const genreImage = document.createElement("img");
      genreImage.src = getGenreImage(tag) || "images/placeholder.png";
      genreImage.alt = tag.name;

      const genreName = document.createElement("p");
      genreName.innerText = tag.name;

      genreItem.appendChild(genreImage);
      genreItem.appendChild(genreName);

      genreItem.addEventListener("click", () => {
        console.log(`Género seleccionado: ${tag.name}`);
      });

      genresList.appendChild(genreItem);
    });

    genresContainer.appendChild(genresList);
  } catch (error) {
    console.error(
      "Error al obtener datos de la API (Géneros musicales):",
      error
    );
  }
}

function getGenreImage(tag) {
  // Verificar si hay imágenes disponibles en la propiedad "image"
  if (tag.image && Array.isArray(tag.image) && tag.image.length > 0) {
    // Obtener la última imagen disponible (cambia el índice si es necesario)
    const lastImageIndex = tag.image.length - 1;
    return tag.image[lastImageIndex]["#text"];
  }

  // Si no hay imágenes disponibles, devolver null
  return null;
}

function search() {
  const searchTerm = document.getElementById("searchInput").value;

  // Actualizar la URL con los parámetros de búsqueda
  const newUrl = `${window.location.origin}${
    window.location.pathname
  }#searchResults?q=${encodeURIComponent(searchTerm)}`;
  window.location.href = newUrl;

  // Llamar a funciones para obtener y mostrar resultados
  searchArtists(searchTerm);
  searchAlbums(searchTerm);
  searchTracks(searchTerm);

  document.getElementById("searchResults").style.display = "block";
}

// Función para buscar artistas
async function searchArtists(searchTerm) {
  const apiUrl = "http://ws.audioscrobbler.com/2.0/";
  const apiKey = "f04f441ada53ca5ad2085e02660c2406";

  try {
    const response = await fetch(
      `${apiUrl}?method=artist.search&artist=${encodeURIComponent(
        searchTerm
      )}&api_key=${apiKey}&format=json`
    );
    const data = await response.json();
    const artists = data.results.artistmatches.artist;

    // Obtener imágenes para artistas
    const artistImages = await Promise.all(
      artists.map(async (artist) => {
        try {
          const artistInfoResponse = await fetch(
            `${apiUrl}?method=artist.getinfo&artist=${encodeURIComponent(
              artist.name
            )}&api_key=${apiKey}&format=json`
          );
          const artistInfoData = await artistInfoResponse.json();

          // Verificar si hay imágenes del artista disponibles
          const artistImages = artistInfoData.artist.image;
          if (artistImages && artistImages.length > 0) {
            // Devolver la última imagen disponible (generalmente la de mayor calidad)
            return artistImages[artistImages.length - 1]["#text"] || "";
          } else {
            console.warn(
              "No se encontraron imágenes para el artista:",
              artist.name
            );
            return "placeholder.jpg"; // Usar imagen de marcador de posición si no hay imágenes disponibles
          }
        } catch (error) {
          console.error("Error al obtener información del artista:", error);
          return "placeholder.jpg"; // Usar imagen de marcador de posición si hay un error
        }
      })
    );

    displayResults(
      artists,
      "artistsResults",
      8,
      "Resultados de Artistas",
      artistImages
    );
  } catch (error) {
    console.error("Error al buscar artistas:", error);
  }
}

// Función para buscar álbumes
async function searchAlbums(searchTerm) {
  const apiUrl = "http://ws.audioscrobbler.com/2.0/";
  const apiKey = "f04f441ada53ca5ad2085e02660c2406";

  try {
    const response = await fetch(
      `${apiUrl}?method=album.search&album=${encodeURIComponent(
        searchTerm
      )}&api_key=${apiKey}&format=json`
    );
    const data = await response.json();
    const albums = data.results.albummatches.album;

    // Obtener imágenes para álbumes
    const albumImages = await Promise.all(
      albums.map(async (album) => {
        const albumInfo = await fetch(
          `${apiUrl}?method=album.getinfo&artist=${encodeURIComponent(
            album.artist
          )}&album=${encodeURIComponent(
            album.name
          )}&api_key=${apiKey}&format=json`
        );
        const albumData = await albumInfo.json();
        return albumData.album.image[2]["#text"]; // Usamos la tercera imagen (de tamaño medio)
      })
    );

    displayResults(
      albums,
      "albumsResults",
      8,
      "Resultados de Álbumes",
      albumImages
    );
  } catch (error) {
    console.error("Error al buscar álbumes:", error);
  }
}

// Función para buscar pistas
async function searchTracks(searchTerm) {
  const apiUrl = "http://ws.audioscrobbler.com/2.0/";
  const apiKey = "f04f441ada53ca5ad2085e02660c2406";

  try {
    const response = await fetch(
      `${apiUrl}?method=track.search&track=${encodeURIComponent(
        searchTerm
      )}&api_key=${apiKey}&format=json`
    );
    const data = await response.json();
    const tracks = data.results.trackmatches.track;

    // Obtener imágenes para pistas
    const trackImages = await Promise.all(
      tracks.map(async (track) => {
        try {
          const trackInfoResponse = await fetch(
            `${apiUrl}?method=track.getinfo&artist=${encodeURIComponent(
              track.artist
            )}&track=${encodeURIComponent(
              track.name
            )}&api_key=${apiKey}&format=json`
          );
          const trackInfoData = await trackInfoResponse.json();
          const albumImage = trackInfoData.track.album.image[2]["#text"]; // Intentamos obtener la imagen del álbum

          // Verificar si la imagen del álbum existe, de lo contrario, intentamos obtener la imagen del artista
          return albumImage || getArtistImage(track.artist, apiKey);
        } catch (error) {
          console.error("Error al obtener información de la pista:", error);
          return ""; // Devolver cadena vacía si hay un error
        }
      })
    );

    displayResults(
      tracks,
      "tracksResults",
      12,
      "Resultados de Pistas",
      trackImages
    );
  } catch (error) {
    console.error("Error al buscar pistas:", error);
  }
}
// Función genérica para mostrar resultados en un contenedor específico
function displayResults(results, containerId, limit, subtitle, images) {
  const resultsContainer = document.getElementById(containerId);
  resultsContainer.innerHTML = "";

  if (results.length > 0) {
    // Agregar subtítulo solo si es necesario
    if (subtitle) {
      const subtitleElement = document.createElement("h2");
      subtitleElement.textContent = subtitle;
      resultsContainer.appendChild(subtitleElement);
    }

    // Limitar la cantidad de resultados
    results = results.slice(0, limit);

    const resultsWrapper = document.createElement("div");
    resultsWrapper.classList.add("results-wrapper");

    results.forEach((result, index) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-item");

      // Personalizar según la estructura de los resultados
      const resultName = document.createElement("h3");
      resultName.textContent = result.name;

      // Agregar imagen solo si existe
      if (images && images[index]) {
        const resultImage = document.createElement("img");
        resultImage.src = images[index]; // Asociar la imagen correspondiente
        resultImage.alt = result.name;
        resultItem.appendChild(resultImage);
      }

      // Verificar si es la sección de artistas para evitar mostrar información adicional
      if (containerId === "artistsResults") {
        // Mostrar solo el nombre del artista
        resultItem.appendChild(resultName);
      } else {
        // Agregar más información según sea necesario
        const resultInfo = document.createElement("p");

        // Mostrar información específica según la sección
        if (containerId === "tracksResults") {
          resultInfo.textContent = ` ${result.name || ""}`;
        } else if (containerId === "albumsResults") {
          resultInfo.textContent = ` ${result.name || ""}`;
          resultItem.appendChild(resultInfo);

          // Agregar el nombre del artista debajo del nombre del álbum
          const artistInfo = document.createElement("p");
          artistInfo.classList.add("artist-info"); // Agregar la clase 'artist-info'
          artistInfo.textContent = ` ${result.artist || ""}`;
          resultItem.appendChild(artistInfo);
        } else {
          // Otro caso, si es necesario agregar información adicional
          resultInfo.textContent = ` ${result.artist || ""}`;
          resultItem.appendChild(resultInfo);
        }
        resultItem.appendChild(resultInfo);
      }

      resultsWrapper.appendChild(resultItem);
    });

    resultsContainer.appendChild(resultsWrapper);
  } else {
    resultsContainer.textContent = "No se encontraron resultados";
  }
  // Función para manejar la búsqueda al presionar Enter
  function handleEnterKey(event) {
    if (event.key === "Enter") {
      search();
    }
  }

  // Agregar el evento para manejar la tecla Enter al campo de búsqueda
  document
    .getElementById("searchInput")
    .addEventListener("keyup", handleEnterKey);
}
