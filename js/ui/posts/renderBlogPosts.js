import { createHtmlForPost } from "../components/createHtml/createHtmlForBlogPosts.js";
import { displayMessage } from "../common/displayMessage.js";

export async function renderBlogPosts(
  targetElement,
  posts = [],
  currentPage,
  perPage,
  totalPosts
) {
  const element = document.querySelector(targetElement);
  if (!element) {
    displayMessage(
      "#notification-message",
      "error",
      `Target element not found: ${targetElement}`
    );
    return;
  }

  element.innerHTML = "";

  if (posts.length === 0) {
    displayMessage(
      "#notification-message",
      "error",
      "There are no blog posts to display. Please try again later."
    );
    return;
  }

  const postHtml = posts.map(createHtmlForPost);
  element.append(...postHtml);

  const morePostsButton = document.getElementById("more-posts-button");
  if (morePostsButton) {
    toggleButtonVisibility(morePostsButton, currentPage * perPage < totalPosts);
  }
}

function toggleButtonVisibility(button, isVisible) {
  if (button) button.style.display = isVisible ? "block" : "none";
}
