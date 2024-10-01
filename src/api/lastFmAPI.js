// Variables de entorno para almacenar la URL base de la API y la clave de API
const apiKey = ''; // Reemplazar por tu Clave de la API
const apiUrl = 'http://ws.audioscrobbler.com/2.0/'; // URL base de la API

/**
 * Realiza una petición GET a la API de Last.fm.
 * @param {string} method - Método de la API a utilizar (e.g., 'chart.getTopTracks').
 * @param {Object} params - Objeto con parámetros adicionales para la petición.
 * @returns {Promise<Object>} - Los datos de la respuesta en formato JSON.
 */
async function fetchFromLastFm(method, params = {}) {
  // Crear la URL base usando el objeto URL y agregar parámetros de búsqueda.
  const url = new URL(apiUrl);
  url.searchParams.append("method", method); // Especificar el método de la API.
  url.searchParams.append("api_key", apiKey); // Añadir la clave de la API a la URL.
  url.searchParams.append("format", "json"); // Definir el formato de la respuesta (JSON).

  // Añadir parámetros adicionales a la URL, como artista, álbum, tags, etc.
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  try {
    // Realizar la petición a la URL generada y verificar la respuesta.
    const response = await fetch(url);
    if (!response.ok) {
      // Manejo de error si la respuesta no es exitosa.
      throw new Error(`Error al realizar la petición: ${response.statusText}`);
    }
    return await response.json(); // Devolver la respuesta en formato JSON.
  } catch (error) {
    // Captura de cualquier error que ocurra durante la petición y loguearlo.
    console.error("Error al comunicarse con la API de Last.fm:", error);
    return null; // Devolver null en caso de error para evitar que la aplicación se detenga.
  }
}

// Agrupación de funciones relacionadas con los álbumes en el objeto AlbumAPI.
const AlbumAPI = {
  // Añadir etiquetas a un álbum específico.
  addAlbumTags: (artist, album, tags) => fetchFromLastFm("album.addTags", { artist, album, tags }),
  // Obtener las etiquetas de un álbum.
  getAlbumTags: (artist, album) => fetchFromLastFm("album.getTags", { artist, album }),
  // Obtener las etiquetas más populares de un álbum.
  getAlbumTopTags: (artist, album) => fetchFromLastFm("album.getTopTags", { artist, album }),
  // Buscar álbumes por nombre.
  searchAlbums: (album) => fetchFromLastFm("album.search", { album }),
};

// Agrupación de funciones relacionadas con los artistas en el objeto ArtistAPI.
const ArtistAPI = {
  addArtistTags: (artist, tags) => fetchFromLastFm("artist.addTags", { artist, tags }),
  getArtistCorrection: (artist) => fetchFromLastFm("artist.getCorrection", { artist }),
  getArtistInfo: (artist) => fetchFromLastFm("artist.getInfo", { artist }),
  getSimilarArtists: (artist) => fetchFromLastFm("artist.getSimilar", { artist }),
  getArtistTags: (artist) => fetchFromLastFm("artist.getTags", { artist }),
  getArtistTopAlbums: (artist) => fetchFromLastFm("artist.getTopAlbums", { artist }),
  getArtistTopTracks: (artist) => fetchFromLastFm("artist.getTopTracks", { artist }),
  searchArtists: (artist) => fetchFromLastFm("artist.search", { artist }),
};

// Agrupación de funciones relacionadas con la autenticación de usuarios en el objeto AuthAPI.
const AuthAPI = {
  getMobileSession: (username, password) => fetchFromLastFm("auth.getMobileSession", { username, password }),
  getSession: (token) => fetchFromLastFm("auth.getSession", { token }),
  getToken: () => fetchFromLastFm("auth.getToken"),
};

// Agrupación de funciones relacionadas con los gráficos en el objeto ChartAPI.
const ChartAPI = {
  getTopArtists: (limit = 10) => fetchFromLastFm("chart.getTopArtists", { limit }),
  getTopTags: (limit = 10) => fetchFromLastFm("chart.getTopTags", { limit }),
  getTopTracks: (limit = 8, period = "year") => fetchFromLastFm("chart.getTopTracks", { limit, period }),
};

// Agrupación de funciones relacionadas con la localización geográfica en el objeto GeoAPI.
const GeoAPI = {
  getGeoTopArtists: (country, limit = 10) => fetchFromLastFm("geo.getTopArtists", { country, limit }),
  getGeoTopTracks: (country, limit = 10) => fetchFromLastFm("geo.getTopTracks", { country, limit }),
};

// Agrupación de funciones relacionadas con etiquetas en el objeto TagAPI.
const TagAPI = {
  getTagInfo: (tag) => fetchFromLastFm("tag.getInfo", { tag }),
  getSimilarTags: (tag) => fetchFromLastFm("tag.getSimilar", { tag }),
  getTagTopAlbums: (tag, limit = 10) => fetchFromLastFm("tag.getTopAlbums", { tag, limit }),
  getTagTopArtists: (tag, limit = 10) => fetchFromLastFm("tag.getTopArtists", { tag, limit }),
  getTagTopTracks: (tag, limit = 10) => fetchFromLastFm("tag.getTopTracks", { tag, limit }),
};

// Agrupación de funciones relacionadas con las pistas en el objeto TrackAPI.
const TrackAPI = {
  addTrackTags: (artist, track, tags) => fetchFromLastFm("track.addTags", { artist, track, tags }),
  getTrackCorrection: (artist, track) => fetchFromLastFm("track.getCorrection", { artist, track }),
  getTrackInfo: (artist, track) => fetchFromLastFm("track.getInfo", { artist, track }),
  getSimilarTracks: (artist, track) => fetchFromLastFm("track.getSimilar", { artist, track }),
  getTrackTags: (artist, track) => fetchFromLastFm("track.getTags", { artist, track }),
  searchTracks: (track) => fetchFromLastFm("track.search", { track }),
};

// Agrupación de funciones relacionadas con usuarios en el objeto UserAPI.
const UserAPI = {
  getUserFriends: (user) => fetchFromLastFm("user.getFriends", { user }),
  getUserInfo: (user) => fetchFromLastFm("user.getInfo", { user }),
  getUserLovedTracks: (user, limit = 10) => fetchFromLastFm("user.getLovedTracks", { user, limit }),
  getUserRecentTracks: (user, limit = 10) => fetchFromLastFm("user.getRecentTracks", { user, limit }),
  getUserTopArtists: (user, limit = 10) => fetchFromLastFm("user.getTopArtists", { user, limit }),
  getUserTopTracks: (user, limit = 10) => fetchFromLastFm("user.getTopTracks", { user, limit }),
};

/**
 * Exportación de funciones agrupadas para uso externo en otras partes del proyecto.
 */
export {
  AlbumAPI,
  ArtistAPI,
  AuthAPI,
  ChartAPI,
  GeoAPI,
  TagAPI,
  TrackAPI,
  UserAPI,
};
