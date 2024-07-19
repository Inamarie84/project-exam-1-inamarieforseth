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
  element.innerHTML = ""; // Clear previous posts

  if (posts.length === 0) {
    console.error("No posts available to render");
    displayMessage(
      "#message",
      "error",
      "There are no blogposts to display, please try again later"
    );
    return;
  }

  // Create HTML for each post and append to the container
  const postHtml = posts.map(createHtmlForPost);
  element.append(...postHtml);

  // Display "More Posts" button if there are more posts to load
  const morePostsButton = document.getElementById("more-posts-button");
  if (morePostsButton) {
    if (currentPage * perPage < getTotalPosts()) {
      morePostsButton.style.display = "block";
    } else {
      morePostsButton.style.display = "none";
    }
  }
}
