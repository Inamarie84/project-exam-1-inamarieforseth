import { extractTermImages } from "../../utilities/imageExtraction.js";

let modal, modalImg, captionText, closeModal;

export function setupModal() {
  modal = document.getElementById("imageModal");
  modalImg = document.getElementById("modalImage");
  captionText = document.getElementById("caption");
  closeModal = document.querySelector(".modal .close");

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}

function openModal(imageSrc, caption) {
  if (modalImg && captionText) {
    modal.style.display = "block";
    modalImg.src = imageSrc;
    captionText.innerHTML = caption;
  }
}

export function handleImageClicks(contentElement, embedded) {
  if (!contentElement) return;

  const postImages = contentElement.querySelectorAll("img");
  postImages.forEach((img) => {
    img.addEventListener("click", () => {
      openModal(img.src, img.alt);
    });
  });

  const termImages = extractTermImages(embedded);
  termImages.forEach((imgUrl) => {
    const termImageElement = document.createElement("img");
    termImageElement.src = imgUrl;
    termImageElement.classList.add("term-image");
    contentElement.appendChild(termImageElement);

    termImageElement.addEventListener("click", () => {
      openModal(imgUrl, ""); // No caption for term images
    });
  });
}
