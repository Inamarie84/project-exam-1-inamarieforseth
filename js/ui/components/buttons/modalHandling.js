import { extractTermImages } from "../../utilities/imageExtraction.js";

export function setupModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const closeModal = document.querySelector(".modal .close");

  if (closeModal) {
    closeModal.addEventListener("click", () => closeModalModal(modal));
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModalModal(modal);
      }
    });
  }
}

function closeModalModal(modal) {
  if (modal) {
    modal.style.display = "none";
    const captionText = document.getElementById("caption");
    if (captionText) {
      captionText.classList.remove("modal-caption");
    }
  }
}

function openModal(imageSrc, caption) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");

  if (modal && modalImg && captionText) {
    modal.style.display = "block";
    modalImg.src = imageSrc;
    captionText.innerHTML = caption;
    captionText.classList.add("modal-caption");
  }
}

export function handleImageClicks(contentElement, embedded) {
  if (!contentElement) return;

  contentElement.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => openModal(img.src, img.alt));
  });

  extractTermImages(embedded).forEach((imgUrl) => {
    const termImageElement = document.createElement("img");
    termImageElement.src = imgUrl;
    termImageElement.classList.add("term-image");
    contentElement.appendChild(termImageElement);

    termImageElement.addEventListener("click", () => openModal(imgUrl, ""));
  });
}
