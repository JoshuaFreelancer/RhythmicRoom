/*import { fetchMusicGenres } from '../api/lastFmAPI';

export async function loadMusicGenres(containerId) {

  const data = await fetchMusicGenres(apiKey, apiUrl);
  const genresContainer = document.getElementById(containerId);
  genresContainer.innerHTML = "";

  data.toptags.tag.forEach(async (tag) => {
    const genreItem = await createGenreItem(tag);
    genresContainer.appendChild(genreItem);
  });
}

async function createGenreItem(tag) {
  const genreItem = document.createElement("li");
  genreItem.classList.add("genre-item");

  const genreImage = await createGenreImage(tag);
  const genreName = createGenreName(tag);

  genreItem.appendChild(genreImage);
  genreItem.appendChild(genreName);

  genreItem.addEventListener("click", () => {
    console.log(`Género seleccionado: ${tag.name}`);
  });

  return genreItem;
}

async function createGenreImage(tag) {
  const genreImage = document.createElement("img");
  genreImage.alt = tag.name;
  genreImage.src = await getArtistImage(tag) || "images/placeholder.png";
  return genreImage;
}

function createGenreName(tag) {
  const genreName = document.createElement("p");
  genreName.innerText = tag.name;
  return genreName;
}*/
