function showSection(sectionId) {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        section.style.display = "none"; // Ocultar todas las secciones
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = "block"; // Mostrar la sección correspondiente

        // Lógica adicional si se necesita
        if (sectionId === "musicas") {
            loadMusicGenres(); // Cargar géneros de música
        } else if (sectionId === "searchResults") {
            handleSearchResults(); // Manejar resultados de búsqueda
        }
    }
}

function handleNavigation() {
    const currentHash = window.location.hash.substr(1); // Obtener el hash actual

    // Mostrar la sección correspondiente
    if (currentHash === "musicas" || currentHash === "listas" || currentHash === "artistas") {
        showSection(currentHash);
    } else if (currentHash.startsWith("searchResults")) {
        showSection("searchResults");
    } else if (currentHash === "login" || currentHash === "register") {
        showSection(currentHash);
    } else {
        showSection("inicio"); // Mostrar la sección de inicio si no hay hash
    }
}

function handleSearchResults() {
    const searchParams = new URLSearchParams(window.location.hash.substr(1).split("?")[1]);
    const searchTerm = searchParams.get("q");

    // Llamar a funciones para obtener y mostrar resultados
    searchArtists(searchTerm);
    searchAlbums(searchTerm);
    searchTracks(searchTerm);

    document.getElementById("searchResults").style.display = "block"; // Mostrar los resultados de búsqueda
}

// Manejar cambios de hash
window.addEventListener("hashchange", handleNavigation);

// Llamar a handleNavigation al cargar la página
document.addEventListener("DOMContentLoaded", handleNavigation);
