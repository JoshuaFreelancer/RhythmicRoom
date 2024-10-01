// Chart.js
const apiKey = "f04f441ada53ca5ad2085e02660c2406"; // Cambia por tu clave de Last.fm
const apiUrl = "http://ws.audioscrobbler.com/2.0/";

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

async function createLatestReleasesChart() {
  const data = await fetchFromLastFm("chart.getTopTracks", { limit: 10 });

  if (!data || !data.tracks || !data.tracks.track) {
    throw new Error("No se pudieron obtener los datos de la API de Last.fm");
  }

  const trackNames = data.tracks.track.map(track => track.name);
  const playcounts = data.tracks.track.map(track => track.playcount);

  const ctx = document.getElementById('latest-releases-chart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: trackNames,
      datasets: [{
        label: 'Playcount',
        data: playcounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Exporta la función para usarla en home.js
export { createLatestReleasesChart };
