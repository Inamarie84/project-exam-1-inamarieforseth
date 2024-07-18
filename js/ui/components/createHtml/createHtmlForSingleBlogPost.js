export function createTitleElement(title) {
  const titleElement = document.createElement("h1");
  titleElement.innerText = title;
  return titleElement;
}

export function createContentElement(content) {
  const contentElement = document.createElement("div");
  contentElement.innerHTML = content;
  return contentElement;
}

export function createBackButton() {
  const backButtonContainer = document.createElement("div");
  backButtonContainer.id = "back-button-container";

  const backButton = document.createElement("button");
  backButton.id = "back-button";
  backButton.innerText = "Back";
  backButton.classList.add("custom-back-button");
  backButton.addEventListener("click", () => {
    window.history.back();
  });

  backButtonContainer.appendChild(backButton);
  return backButtonContainer;
}
