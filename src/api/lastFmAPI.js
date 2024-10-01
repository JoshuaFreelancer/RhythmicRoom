const apiKey = "f04f441ada53ca5ad2085e02660c2406"; // Cambiar por tu key de Last.fm
const apiUrl = "http://ws.audioscrobbler.com/2.0/";

/**
 * Realiza una petición GET a la API de Last.fm.
 * @param {string} method - Método de la API a utilizar (e.g., 'chart.getTopTracks').
 * @param {Object} params - Objeto con parámetros adicionales para la petición.
 * @returns {Promise<Object>} - Los datos de la respuesta en formato JSON.
 */
async function fetchFromLastFm(method, params = {}) {
  const url = new URL(apiUrl);
  url.searchParams.append("method", method);
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("format", "json");

  // Añadir parámetros adicionales si existen
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

const AuthAPI = {
  getMobileSession: (username, password) => fetchFromLastFm("auth.getMobileSession", { username, password }),
  getSession: (token) => fetchFromLastFm("auth.getSession", { token }),
  getToken: () => fetchFromLastFm("auth.getToken"),
};

const ChartAPI = {
  getTopArtists: (limit = 10) => fetchFromLastFm("chart.getTopArtists", { limit }),
  getTopTags: (limit = 10) => fetchFromLastFm("chart.getTopTags", { limit }),
  getTopTracks: (limit = 8, period = "year") => fetchFromLastFm("chart.getTopTracks", { limit, period }),
};

const GeoAPI = {
  getGeoTopArtists: (country, limit = 10) => fetchFromLastFm("geo.getTopArtists", { country, limit }),
  getGeoTopTracks: (country, limit = 10) => fetchFromLastFm("geo.getTopTracks", { country, limit }),
};

const TagAPI = {
  getTagInfo: (tag) => fetchFromLastFm("tag.getInfo", { tag }),
  getSimilarTags: (tag) => fetchFromLastFm("tag.getSimilar", { tag }),
  getTagTopAlbums: (tag, limit = 10) => fetchFromLastFm("tag.getTopAlbums", { tag, limit }),
  getTagTopArtists: (tag, limit = 10) => fetchFromLastFm("tag.getTopArtists", { tag, limit }),
  getTagTopTracks: (tag, limit = 10) => fetchFromLastFm("tag.getTopTracks", { tag, limit }),
};

const TrackAPI = {
  addTrackTags: (artist, track, tags) => fetchFromLastFm("track.addTags", { artist, track, tags }),
  getTrackCorrection: (artist, track) => fetchFromLastFm("track.getCorrection", { artist, track }),
  getTrackInfo: (artist, track) => fetchFromLastFm("track.getInfo", { artist, track }),
  getSimilarTracks: (artist, track) => fetchFromLastFm("track.getSimilar", { artist, track }),
  getTrackTags: (artist, track) => fetchFromLastFm("track.getTags", { artist, track }),
  searchTracks: (track) => fetchFromLastFm("track.search", { track }),
};

const UserAPI = {
  getUserFriends: (user) => fetchFromLastFm("user.getFriends", { user }),
  getUserInfo: (user) => fetchFromLastFm("user.getInfo", { user }),
  getUserLovedTracks: (user, limit = 10) => fetchFromLastFm("user.getLovedTracks", { user, limit }),
  getUserRecentTracks: (user, limit = 10) => fetchFromLastFm("user.getRecentTracks", { user, limit }),
  getUserTopArtists: (user, limit = 10) => fetchFromLastFm("user.getTopArtists", { user, limit }),
  getUserTopTracks: (user, limit = 10) => fetchFromLastFm("user.getTopTracks", { user, limit }),
};

/**
 * Exportación de funciones agrupadas para uso externo.
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
