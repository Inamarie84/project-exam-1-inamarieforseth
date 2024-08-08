// backToTopButton.js

function toggleButtonVisibility(button, isVisible) {
  if (button) button.style.display = isVisible ? "block" : "none";
}

export function setupBackToTopButton() {
  const backToTopButton = document.getElementById("back-to-top-button");

  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      toggleButtonVisibility(backToTopButton, false);
    });
  }

  window.addEventListener("scroll", () => {
    if (backToTopButton) {
      if (window.scrollY === 0) {
        toggleButtonVisibility(backToTopButton, false);
      } else if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight
      ) {
        toggleButtonVisibility(backToTopButton, true);
      }
    }
  });
}
