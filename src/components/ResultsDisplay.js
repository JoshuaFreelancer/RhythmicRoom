/*export function displayResults(results, containerId, subtitle) {
    const resultsContainer = document.getElementById(containerId);
    resultsContainer.innerHTML = "";
  
    if (results.length > 0) {
      const subtitleElement = document.createElement("h2");
      subtitleElement.textContent = subtitle;
      resultsContainer.appendChild(subtitleElement);
  
      const resultsWrapper = document.createElement("div");
      resultsWrapper.classList.add("results-wrapper");
  
      results.forEach((result) => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.innerHTML = `<h3>${result.name}</h3>`;
        resultsWrapper.appendChild(resultItem);
      });
  
      resultsContainer.appendChild(resultsWrapper);
    } else {
      resultsContainer.textContent = "No se encontraron resultados";
    }
  }*/
  