import { createHtmlForPost } from "../components/createHtml/createHtmlForBlogPosts.js";
import { getTotalPosts } from "../../api/posts/fetchBlogPosts.js";
import { displayMessage } from "../common/displayMessage.js";

export async function renderBlogPosts(
  targetElement,
  posts = [],
  currentPage,
  perPage
) {
  const element = document.querySelector(targetElement);
  if (!element) {
    console.error(`Element with selector ${targetElement} not found`);
    return;
  }
  element.innerHTML = "";

  if (posts.length === 0) {
    console.error("No posts available to render");
    displayMessage(
      "#message",
      "error",
      "There are no blogposts to display, please try again later"
    );
    return;
  }

  const postHtml = posts.map(createHtmlForPost);
  element.append(...postHtml);

  const morePostsButton = document.getElementById("more-posts-button");
  if (morePostsButton) {
    toggleButtonVisibility(
      morePostsButton,
      currentPage * perPage < getTotalPosts()
    );
  }
}

function toggleButtonVisibility(button, isVisible) {
  if (button) button.style.display = isVisible ? "block" : "none";
}
