const apiKey = "f04f441ada53ca5ad2085e02660c2406"; // Cambiar por tu key de Last.fm
const apiUrl = "http://ws.audioscrobbler.com/2.0/";

// Función para realizar una petición GET a la API de Last.fm.
async function fetchFromLastFm(method, params = {}) {
  const url = new URL(apiUrl);
  url.searchParams.append("method", method);
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("format", "json");

  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al realizar la petición: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al comunicarse con la API de Last.fm:", error);
    return null;
  }
}

// Agrupaciones de funciones por tipo
const AlbumAPI = {
  addAlbumTags: (artist, album, tags) => fetchFromLastFm("album.addTags", { artist, album, tags }),
  getAlbumTags: (artist, album) => fetchFromLastFm("album.getTags", { artist, album }),
  getAlbumTopTags: (artist, album) => fetchFromLastFm("album.getTopTags", { artist, album }),
  searchAlbums: (album) => fetchFromLastFm("album.search", { album }),
};

// Exportación de funciones para uso externo
export default AlbumAPI;
