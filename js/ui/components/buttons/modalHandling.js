// import { extractTermImages } from "../../utilities/imageExtraction.js";

// let modal, modalImg, captionText, closeModal;

// function setupModal() {
//   modal = document.getElementById("imageModal");
//   modalImg = document.getElementById("modalImage");
//   captionText = document.getElementById("caption");
//   closeModal = document.querySelector(".modal .close");

//   closeModal.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   modal.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   });
// }

// function openModal(imageSrc, caption) {
//   modal.style.display = "block";
//   modalImg.src = imageSrc;
//   captionText.innerHTML = caption;
// }

// function handleImageClicks(contentElement, embedded) {
//   const postImages = contentElement.querySelectorAll("img");
//   postImages.forEach((img) => {
//     img.addEventListener("click", () => {
//       openModal(img.src, img.alt);
//     });
//   });

//   // Add click event listeners to images under wp:term if they exist
//   const termImages = extractTermImages(embedded);
//   termImages.forEach((imgUrl) => {
//     const termImageElement = document.createElement("img");
//     termImageElement.src = imgUrl;
//     termImageElement.classList.add("term-image");
//     contentElement.appendChild(termImageElement);

//     termImageElement.addEventListener("click", () => {
//       openModal(imgUrl, ""); // No caption for term images
//     });
//   });
// }

// export { setupModal, handleImageClicks };

import { extractTermImages } from "../../utilities/imageExtraction.js";

let modal, modalImg, captionText, closeModal;

function setupModal() {
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

function handleImageClicks(contentElement, embedded) {
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

export { setupModal, handleImageClicks };
