// loader.js

// Función para mostrar el loader
function showLoader() {
    document.getElementById("loader").style.display = "flex";
}

// Función para ocultar el loader
function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

// Función para detener la carga automáticamente después de un tiempo
function stopLoadingAutomatically() {
    hideLoader();
    console.log("La carga ha sido detenida automáticamente debido a un tiempo de espera.");
}

// Exportar las funciones para que estén disponibles en otros scripts
export { showLoader, hideLoader, stopLoadingAutomatically };
