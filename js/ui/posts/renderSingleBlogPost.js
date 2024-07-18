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

  // Clear previous content
  element.innerHTML = "";

  // Log post object for debugging
  console.log("Post object:", post);

  // Check if post has the required properties
  if (!post || !post.title || !post.content) {
    console.error("Post data is missing required properties");
    return;
  }

  // Destructure the post object
  const { title, content, _embedded } = post;

  // Create and append the title element
  const titleElement = createTitleElement(title.rendered);
  element.appendChild(titleElement);

  // Extract and append the featured image if available
  const featuredImageUrl = extractFeaturedImageUrl(_embedded);
  if (featuredImageUrl) {
    const imageElement = document.createElement("img");
    imageElement.src = featuredImageUrl;
    imageElement.classList.add("featured-image");
    element.appendChild(imageElement);

    // Add event listener to open modal on image click
    imageElement.addEventListener("click", () => {
      openModal(featuredImageUrl, ""); // No caption for featured image
    });
  }

  // Create and append the content element
  const contentElement = createContentElement(content.rendered);
  element.appendChild(contentElement);

  // Create and append the back button
  const backButtonContainer = createBackButton();
  element.appendChild(backButtonContainer);

  // Setup modal functionality
  setupModal();

  // Add click event listeners to images inside the post content
  handleImageClicks(contentElement, _embedded);
}
