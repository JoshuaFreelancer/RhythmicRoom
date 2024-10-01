import { ChartAPI, ArtistAPI } from '../api/lastFmAPI.js';

/**
 * Crea el carrusel de artistas y lo agrega al contenedor correspondiente.
 * @param {string} containerId - El ID del contenedor en el que se agregará el carrusel.
 */
export async function createArtistCarousel(containerId) {
  const artistCarousel = document.getElementById(containerId);
  artistCarousel.classList.add("carousel-track");

  try {
    // Obtener los 10 artistas más populares
    const data = await ChartAPI.getTopArtists(10);
    console.log("Datos de artistas obtenidos:", data);

    if (data && data.artists && data.artists.artist) {
      const artists = data.artists.artist.slice(0, 10);
      for (const artist of artists) {
        console.log("Creando tarjeta para el artista:", artist.name);
        const artistCard = await createArtistCard(artist);
        if (artistCard) {
          artistCarousel.appendChild(artistCard);
        }
      }

      // Agregar navegación al carrusel
      addCarouselNavigation(containerId, artists.length); // Pasar el número total de artistas
    }
  } catch (error) {
    console.error("Error al crear el carrusel de artistas:", error);
  }
}

/**
 * Crea una tarjeta individual para un artista.
 * @param {Object} artist - Objeto con la información del artista.
 * @returns {HTMLElement} - Elemento HTML que representa la tarjeta del artista.
 */
async function createArtistCard(artist) {
  const artistCard = document.createElement("div");
  artistCard.classList.add("flip-card");

  // Crear contenedor interno para la tarjeta flip
  const flipCardInner = document.createElement("div");
  flipCardInner.classList.add("flip-card-inner");

  // Parte frontal de la tarjeta con imagen y nombre
  const flipCardFront = document.createElement("div");
  flipCardFront.classList.add("flip-card-front");

  // Obtener información del artista para usar su imagen y otras propiedades
  const artistData = await ArtistAPI.getArtistInfo(artist.name);
  console.log("Datos del artista:", artistData);

  const imageUrl = artistData?.artist?.image?.[3]["#text"] || 'https://via.placeholder.com/150x200?text=No+Image'; // Placeholder si no hay imagen
  const artistImage = document.createElement("img");
  artistImage.src = imageUrl;
  artistImage.alt = `Imagen de ${artist.name}`;
  artistImage.classList.add("artist-image");

  const artistName = document.createElement("p");
  artistName.innerText = artist.name;
  artistName.classList.add("artist-name");

  flipCardFront.appendChild(artistImage);
  flipCardFront.appendChild(artistName);

  // Parte posterior de la tarjeta con información adicional
  const flipCardBack = document.createElement("div");
  flipCardBack.classList.add("flip-card-back");

  const artistNameBack = document.createElement("p");
  artistNameBack.innerText = artist.name;
  artistNameBack.classList.add("artist-name-back");

  const artistTags = artistData?.artist?.tags?.tag.slice(0, 3).map(tag => tag.name).join(', ') || "N/A";
  const artistGenres = document.createElement("p");
  artistGenres.innerText = `Géneros: ${artistTags}`;
  artistGenres.classList.add("artist-genres");

  const artistListeners = document.createElement("p");
  artistListeners.innerText = `Oyentes: ${artistData?.artist?.stats?.listeners || "Desconocido"}`;
  artistListeners.classList.add("artist-listeners");

  const artistPlayCount = document.createElement("p");
  artistPlayCount.innerText = `Reproducciones: ${artistData?.artist?.stats?.playcount || "Desconocido"}`;
  artistPlayCount.classList.add("artist-playcount");

  flipCardBack.appendChild(artistNameBack);
  flipCardBack.appendChild(artistGenres);
  flipCardBack.appendChild(artistListeners);
  flipCardBack.appendChild(artistPlayCount);

  flipCardInner.appendChild(flipCardFront);
  flipCardInner.appendChild(flipCardBack);
  artistCard.appendChild(flipCardInner);

  return artistCard;
}

/**
 * Añade funcionalidad de desplazamiento al carrusel con flechas izquierda y derecha.
 * @param {string} containerId - El ID del contenedor del carrusel.
 * @param {number} totalArtists - Número total de artistas en el carrusel.
 */
function addCarouselNavigation(containerId, totalArtists) {
  const carouselContainer = document.getElementById(containerId);
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');

  let currentIndex = 0;

  // Almacena el ancho del contenedor
  const cardWidth = carouselContainer.querySelector('.flip-card').offsetWidth;

  // Agregar evento para desplazamiento a la derecha
  rightArrow.addEventListener('click', () => {
    if (currentIndex < totalArtists - 1) {
      currentIndex++;
      updateCarouselPosition();
    }
  });

  // Agregar evento para desplazamiento a la izquierda
  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarouselPosition();
    }
  });

// Mantiene las flechas visibles mientras el carrusel se desplaza
function updateCarouselPosition() {
  const carouselContainer = document.getElementById(containerId);
  const offset = currentIndex * cardWidth; // Ajustar según el tamaño de cada tarjeta

  // Desplazar el carrusel centrando la tarjeta actual
  carouselContainer.scrollTo({
    left: offset,
    behavior: 'smooth', // Añadir desplazamiento suave
  });

  // Actualizar la posición de las flechas
  updateArrowVisibility();
}

function updateArrowVisibility() {
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');
  
  const totalCards = carouselContainer.querySelectorAll('.flip-card').length;
  const maxIndex = totalCards - 1;

  leftArrow.style.display = currentIndex > 0 ? 'flex' : 'none';
  rightArrow.style.display = currentIndex < maxIndex ? 'flex' : 'none';
}

}
