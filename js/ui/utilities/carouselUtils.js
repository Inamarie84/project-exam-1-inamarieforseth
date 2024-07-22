// updateArrows.js

export function updateArrows() {
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  if (!leftArrow || !rightArrow) return; // Exit if arrows are not found

  const currentPage = parseInt(
    document.querySelector(".carousel-track").dataset.currentPage,
    10
  );
  const totalPages = parseInt(
    document.querySelector(".carousel-track").dataset.totalPages,
    10
  );

  leftArrow.disabled = currentPage === 1;
  rightArrow.disabled = currentPage >= totalPages;
}
