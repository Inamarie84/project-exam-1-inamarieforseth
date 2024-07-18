import { extractTermImages } from "../../utilities/imageExtraction.js";

// export function setupModal() {
//   const modal = document.getElementById("imageModal");
//   const modalImg = document.getElementById("modalImage");
//   const captionText = document.getElementById("caption");
//   const closeModal = document.querySelector(".modal .close");

//   function openModal(imageSrc, caption) {
//     modal.style.display = "block";
//     modalImg.src = imageSrc;
//     captionText.innerHTML = caption;
//   }

//   closeModal.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   modal.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   });
// }

// export function handleImageClicks(contentElement, embedded) {
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

let modal, modalImg, captionText, closeModal;

function setupModal() {
  modal = document.getElementById("imageModal");
  modalImg = document.getElementById("modalImage");
  captionText = document.getElementById("caption");
  closeModal = document.querySelector(".modal .close");

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

function openModal(imageSrc, caption) {
  modal.style.display = "block";
  modalImg.src = imageSrc;
  captionText.innerHTML = caption;
}

function handleImageClicks(contentElement, embedded) {
  const postImages = contentElement.querySelectorAll("img");
  postImages.forEach((img) => {
    img.addEventListener("click", () => {
      openModal(img.src, img.alt);
    });
  });

  // Add click event listeners to images under wp:term if they exist
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
