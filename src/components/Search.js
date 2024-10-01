/*import { searchArtists, searchAlbums, searchTracks } from '../api/lastFmAPI';

export function setupSearch() {
  document.getElementById("searchInput").addEventListener("keyup", handleEnterKey);
}

async function search() {
  const searchTerm = document.getElementById("searchInput").value;

  try {
    // Actualizar la URL con los parámetros de búsqueda
    const newUrl = `${window.location.origin}${window.location.pathname}#searchResults?q=${encodeURIComponent(searchTerm)}`;
    window.location.href = newUrl;

    const [artists, albums, tracks] = await Promise.all([
      searchArtists(searchTerm),
      searchAlbums(searchTerm),
      searchTracks(searchTerm),
    ]);

    displayResults(artists, "artistsResults", "Resultados de Artistas");
    displayResults(albums, "albumsResults", "Resultados de Álbumes");
    displayResults(tracks, "tracksResults", "Resultados de Pistas");
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
  }
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    search();
  }
}*/
