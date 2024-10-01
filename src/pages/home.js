import { createArtistCarousel } from '../components/ArtistCarousel.js';
/*import { createLatestReleasesChart } from '../components/Chart.js';*/

// Al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    createArtistCarousel('artistCarouselContainer');
    await createLatestReleasesChart(); // Llama a la función para crear el gráfico
});
