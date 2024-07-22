export function renderPostTitles(titles) {
  const container = document.querySelector(".about-container");
  const loadingIndicatorWrapper = document.querySelector(
    "#loading-indicator-wrapper"
  );

  if (!container) {
    console.error("about-container not found");
    return;
  }

  // Clear any existing content
  container.innerHTML = "";

  // Create and append the list of titles
  const list = document.createElement("ul");
  titles.forEach((title) => {
    const listItem = document.createElement("li");
    listItem.textContent = title;
    list.appendChild(listItem);
  });
  container.appendChild(list);

  // Create and add the "Read More" button
  const readMoreButton = document.createElement("a");
  readMoreButton.href = "blogposts.html";
  readMoreButton.textContent = "Read More";
  readMoreButton.classList.add("read-more-button"); // Optional
  container.appendChild(readMoreButton);

  // Hide the loading indicator
  if (loadingIndicatorWrapper) {
    loadingIndicatorWrapper.style.display = "none";
  }
}

export function renderImages(images) {
  const aboutImagesSection = document.querySelector(".about-images");
  const loadingIndicatorWrapper = document.querySelector(
    "#loading-indicator-wrapper"
  );

  if (!aboutImagesSection) {
    console.error("about-images section not found");
    return;
  }

  // Clear any existing content
  aboutImagesSection.innerHTML = "";

  // Create and append the images
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    aboutImagesSection.appendChild(imgElement);
  });

  // Hide the loading indicator
  if (loadingIndicatorWrapper) {
    loadingIndicatorWrapper.style.display = "none";
  }
}
