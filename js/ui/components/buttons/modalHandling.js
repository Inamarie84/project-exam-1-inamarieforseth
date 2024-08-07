import { extractTermImages } from "../../utilities/imageExtraction.js";

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

// import { extractTermImages } from "../../utilities/imageExtraction.js";

// let modal, modalImg, captionText, closeModal;

// function setupModal() {
//   modal = document.getElementById("imageModal");
//   modalImg = document.getElementById("modalImage");
//   captionText = document.getElementById("caption");
//   closeModal = document.querySelector(".modal .close");

//   // Add event listener to close the modal when 'X' is clicked
//   closeModal.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   // Add event listener to close the modal when clicking outside of the image
//   modal.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   });
// }

// function openModal(imageSrc, caption) {
//   if (imageSrc) {
//     // Check if the image source is not empty
//     modal.style.display = "block";
//     modalImg.src = imageSrc; // Set the modal image source
//     captionText.innerHTML = caption || ""; // Set the caption, or leave empty if none provided
//   } else {
//     console.warn("No valid image source provided for the modal.");
//   }
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
//     if (imgUrl) {
//       // Ensure the image URL is valid
//       const termImageElement = document.createElement("img");
//       termImageElement.src = imgUrl;
//       termImageElement.classList.add("term-image");
//       contentElement.appendChild(termImageElement);

//       termImageElement.addEventListener("click", () => {
//         openModal(imgUrl, ""); // Open modal with valid image URL
//       });
//     }
//   });
// }

// export { setupModal, handleImageClicks };
