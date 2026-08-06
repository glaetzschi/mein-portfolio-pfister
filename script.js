const galleryImages = document.querySelectorAll(".gallery-image");
const galleryDots = document.querySelectorAll(".gallery-dot");
const previousButton = document.querySelector(".gallery-prev");
const nextButton = document.querySelector(".gallery-next");

let currentImage = 0;

/* Grossansicht erstellen */
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");

lightbox.innerHTML = `
  <button
    class="lightbox-close"
    type="button"
    aria-label="Grossansicht schliessen"
  >
    &times;
  </button>

  <button
    class="lightbox-button lightbox-prev"
    type="button"
    aria-label="Vorheriges Bild"
  >
    &#10094;
  </button>

  <img class="lightbox-image" src="" alt="Vergrössertes Galeriebild">

  <button
    class="lightbox-button lightbox-next"
    type="button"
    aria-label="Nächstes Bild"
  >
    &#10095;
  </button>
`;

document.body.appendChild(lightbox);

const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrevious = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

function showImage(index) {
  galleryImages.forEach((image) => {
    image.classList.remove("active");
  });

  galleryDots.forEach((dot) => {
    dot.classList.remove("active");
  });

  galleryImages[index].classList.add("active");
  galleryDots[index].classList.add("active");

  if (lightbox.classList.contains("active")) {
    updateLightbox();
  }
}

function updateLightbox() {
  lightboxImage.src = galleryImages[currentImage].src;
  lightboxImage.alt = galleryImages[currentImage].alt;
}

function openLightbox(index) {
  currentImage = index;
  showImage(currentImage);
  updateLightbox();

  lightbox.classList.add("active");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.classList.remove("lightbox-open");
}

/* Normale Galerie */

nextButton.addEventListener("click", () => {
  currentImage = (currentImage + 1) % galleryImages.length;
  showImage(currentImage);
});

previousButton.addEventListener("click", () => {
  currentImage =
    (currentImage - 1 + galleryImages.length) % galleryImages.length;

  showImage(currentImage);
});

galleryDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentImage = index;
    showImage(currentImage);
  });
});

/* Bild anklicken und vergrössern */

galleryImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    openLightbox(index);
  });
});

/* Steuerung der Grossansicht */

lightboxNext.addEventListener("click", () => {
  currentImage = (currentImage + 1) % galleryImages.length;
  showImage(currentImage);
});

lightboxPrevious.addEventListener("click", () => {
  currentImage =
    (currentImage - 1 + galleryImages.length) % galleryImages.length;

  showImage(currentImage);
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

/* Tastatursteuerung */

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    currentImage = (currentImage + 1) % galleryImages.length;
    showImage(currentImage);
  }

  if (event.key === "ArrowLeft") {
    currentImage =
      (currentImage - 1 + galleryImages.length) % galleryImages.length;

    showImage(currentImage);
  }
});

