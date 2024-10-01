function showLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "flex"; // Mostrar el loader
    }
}

function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none"; // Ocultar el loader
    }
}
