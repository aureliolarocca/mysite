document.addEventListener("DOMContentLoaded", () => {
  // --- LOGICA ESISTENTE DEGLI SLIDER ---

  // Riferimenti ai link delle categorie (gli <li> della tua sezione #project)
  const webProjectsLink = document.getElementById("web-projects-link");
  const gamesProjectsLink = document.getElementById("games-projects-link");
  const otherProjectsLink = document.getElementById("other-projects-link");

  // Riferimenti ai contenitori degli slider (i div con classe .slider-wrapper)
  const webSliderWrapper = document.getElementById("web-slider-wrapper");
  const gamesSliderWrapper = document.getElementById("games-slider-wrapper");
  const otherSliderWrapper = document.getElementById("other-slider-wrapper");

  // Array di tutti i contenitori degli slider per facilitare la gestione della visibilità
  const allSliderWrappers = [
    webSliderWrapper,
    gamesSliderWrapper,
    otherSliderWrapper,
  ];

  // Controlla che tutti i riferimenti agli slider siano validi prima di inizializzarli
  if (
    webProjectsLink &&
    gamesProjectsLink &&
    otherProjectsLink &&
    webSliderWrapper &&
    gamesSliderWrapper &&
    otherSliderWrapper
  ) {
    /**
     * Inizializza un singolo slider, gestendo la sua logica interna (navigazione, puntini).
     * Questa funzione è riutilizzabile per ogni slider presente nella pagina.
     * @param {HTMLElement} sliderWrapper L'elemento DOM che contiene lo slider specifico.
     */
    function initializeSlider(sliderWrapper) {
      // Seleziona gli elementi specifici di questo slider
      const slider = sliderWrapper.querySelector(".slider");
      const images = sliderWrapper.querySelectorAll(".slider img");
      const prevButton = sliderWrapper.querySelector(".prev-button");
      const nextButton = sliderWrapper.querySelector(".next-button");
      const dotsContainer = sliderWrapper.querySelector(".dots-container");

      // Solo se tutti gli elementi necessari dello slider sono presenti
      if (
        slider &&
        images.length > 0 &&
        prevButton &&
        nextButton &&
        dotsContainer
      ) {
        let currentIndex = 0; // Indice corrente per questo specifico slider (inizia da 0)
        const totalImages = images.length; // Numero totale di immagini per questo specifico slider

        /**
         * Aggiorna la posizione dello slider applicando la trasformazione CSS.
         * Ogni immagine occupa il 100% della larghezza, quindi lo scorrimento è un multiplo di -100%.
         */
        function updateSlider() {
          slider.style.transform = `translateX(${-currentIndex * 100}%)`;
          updateDots(); // Aggiorna anche lo stato attivo dei puntini di navigazione
        }

        /**
         * Crea dinamicamente gli indicatori (puntini) di navigazione per questo slider.
         * Un puntino viene creato per ogni immagine nello slider.
         */
        function createDots() {
          dotsContainer.innerHTML = ""; // Pulisci eventuali puntini preesistenti
          for (let i = 0; i < totalImages; i++) {
            const dot = document.createElement("span"); // Crea un nuovo elemento span
            dot.classList.add("dot"); // Aggiungi la classe CSS per lo stile del puntino
            dot.setAttribute("aria-label", `Vai alla slide ${i + 1}`); // Per l'accessibilità
            // Aggiungi un event listener per cambiare slide al click del puntino
            dot.addEventListener("click", () => {
              currentIndex = i; // Imposta l'indice corrente al click
              updateSlider(); // Aggiorna lo slider alla nuova posizione
            });
            dotsContainer.appendChild(dot); // Aggiungi il puntino al suo contenitore
          }
          updateDots(); // Inizializza lo stato attivo del puntino (il primo attivo)
        }

        /**
         * Aggiorna la classe 'active' sui puntini di navigazione,
         * evidenziando quello corrispondente all'immagine attualmente visibile.
         */
        function updateDots() {
          const dots = dotsContainer.querySelectorAll(".dot"); // Seleziona solo i puntini di questo slider
          dots.forEach((dot, index) => {
            if (index === currentIndex) {
              dot.classList.add("active"); // Aggiungi la classe 'active' se l'indice corrisponde
            } else {
              dot.classList.remove("active"); // Rimuovi la classe 'active' altrimenti
            }
          });
        }

        // Aggiungi event listener per il pulsante "Precedente" di questo slider
        prevButton.addEventListener("click", () => {
          // Se non è la prima slide, vai alla precedente; altrimenti, vai all'ultima (loop)
          currentIndex = currentIndex > 0 ? currentIndex - 1 : totalImages - 1;
          updateSlider(); // Aggiorna la visualizzazione dello slider
        });

        nextButton.addEventListener("click", () => {
          // Se non è l'ultima slide, vai alla successiva; altrimenti, vai alla prima (loop)
          currentIndex = currentIndex < totalImages - 1 ? currentIndex + 1 : 0;
          updateSlider(); // Aggiorna la visualizzazione dello slider
        });

        // Esegui l'inizializzazione del singolo slider quando la funzione viene chiamata
        createDots(); // Genera i puntini
        updateSlider(); // Imposta la posizione iniziale dello slider
      } else {
        console.warn(
          "Alcuni elementi dello slider non sono stati trovati per il wrapper:",
          sliderWrapper.id
        );
      }
    }

    // Inizializza tutti gli slider disponibili all'avvio della pagina
    initializeSlider(webSliderWrapper);
    initializeSlider(gamesSliderWrapper);
    initializeSlider(otherSliderWrapper);

    /**
     * Mostra lo slider specificato e nasconde tutti gli altri slider.
     * Utilizzato per alternare la visibilità dei progetti in base alla categoria.
     * @param {HTMLElement} sliderToShow Il contenitore dello slider (wrapper) da rendere visibile.
     */
    function showSpecificSlider(sliderToShow) {
      allSliderWrappers.forEach((wrapper) => {
        if (wrapper === sliderToShow) {
          wrapper.classList.add("active"); // Aggiungi la classe 'active' per mostrare lo slider
        } else {
          wrapper.classList.remove("active"); // Rimuovi la classe 'active' per nascondere gli altri
        }
      });
    }

    // Aggiungi gli event listener ai link delle categorie per mostrare lo slider corrispondente al click
    webProjectsLink.addEventListener("click", () =>
      showSpecificSlider(webSliderWrapper)
    );
    gamesProjectsLink.addEventListener("click", () =>
      showSpecificSlider(gamesSliderWrapper)
    );
    otherProjectsLink.addEventListener("click", () =>
      showSpecificSlider(otherSliderWrapper)
    );

    // Mostra lo slider "Siti Web" di default al caricamento della pagina.
    showSpecificSlider(webSliderWrapper);
  } else {
    console.error(
      "Non tutti gli elementi necessari per gli slider sono stati trovati. Assicurati che gli ID e le classi siano corretti nell'HTML."
    );
  }
});
