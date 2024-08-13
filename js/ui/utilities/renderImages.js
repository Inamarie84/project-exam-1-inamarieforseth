export function renderImages(images) {
  const aboutImagesSection = document.querySelector(".about-images");
  const loadingIndicatorWrapper = document.querySelector(
    "#loading-indicator-wrapper"
  );

  if (!aboutImagesSection) {
    console.error("about-images section not found");
    return;
  }

  aboutImagesSection.innerHTML = "";

  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    aboutImagesSection.appendChild(imgElement);
  });
}
