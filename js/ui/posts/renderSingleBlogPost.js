import {
  createTitleElement,
  createContentElement,
  createBackButton,
} from "../components/createHtml/createHtmlForSingleBlogPost.js";
import {
  setupModal,
  handleImageClicks,
} from "../../ui/components/buttons/modalHandling.js";
import {
  extractFeaturedImageUrl,
  extractTermImages,
} from "../utilities/imageExtraction.js";

export function renderSingleBlogPost(targetElement, post) {
  const element = document.querySelector(targetElement);
  if (!element) {
    console.error(`Element with selector ${targetElement} not found`);
    return;
  }

  element.innerHTML = "";

  if (!post || !post.title || !post.content) {
    return;
  }

  const { title, content, _embedded, date } = post;

  const titleElement = createTitleElement(title.rendered);
  element.appendChild(titleElement);

  const featuredImageUrl = extractFeaturedImageUrl(_embedded);
  if (featuredImageUrl) {
    const imageElement = document.createElement("img");
    imageElement.src = featuredImageUrl;
    imageElement.classList.add("featured-image");
    element.appendChild(imageElement);

    imageElement.addEventListener("click", () => {
      openModal(featuredImageUrl, "");
    });
  }

  const dateElement = document.createElement("p");
  dateElement.innerText = date;
  dateElement.classList.add("blogpost-date");
  element.appendChild(dateElement);

  const contentElement = createContentElement(content.rendered);
  element.appendChild(contentElement);

  const backButtonContainer = createBackButton();
  element.appendChild(backButtonContainer);

  setupModal();

  handleImageClicks(contentElement, _embedded);
}
