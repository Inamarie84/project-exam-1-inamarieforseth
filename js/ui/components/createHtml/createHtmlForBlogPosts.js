// createHtmlForPost.js
import {
  extractFeaturedImageUrl,
  removeImagesAndFigcaptionsFromContent,
} from "../../utilities/utilities.js";

export function createHtmlForPost(post) {
  const { title, content, id, _embedded } = post;

  const postContainer = document.createElement("div");
  postContainer.classList.add("post");

  // Create and append the title
  const titleElement = document.createElement("h4");
  titleElement.innerText = title.rendered;
  postContainer.appendChild(titleElement);

  // Extract and append the featured image if available
  const featuredImageUrl = extractFeaturedImageUrl(_embedded);
  if (featuredImageUrl) {
    const imageElement = document.createElement("img");
    imageElement.src = featuredImageUrl;
    imageElement.classList.add("featured-image"); // Add class to the image element
    postContainer.appendChild(imageElement);
  }

  // Create and append the content
  const contentElement = document.createElement("div");
  contentElement.innerHTML = removeImagesAndFigcaptionsFromContent(
    content.rendered
  );
  postContainer.appendChild(contentElement);

  // Create a link/button to view the full post
  const readMoreLink = document.createElement("a");
  readMoreLink.href = `singleblogpost.html?id=${id}`; // Adjust URL as per your route
  readMoreLink.textContent = "Read More";
  readMoreLink.classList.add("read-more-link"); // Add class for styling if needed
  postContainer.appendChild(readMoreLink);

  return postContainer;
}
