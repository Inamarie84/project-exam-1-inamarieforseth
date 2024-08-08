import {
  fetchBlogPosts,
  getTotalPosts,
} from "../../../api/posts/fetchBlogPosts.js";
import { renderBlogPosts } from "../../../ui/posts/renderBlogPosts.js";
import { createHtmlForPost } from "../../components/createHtml/createHtmlForBlogPosts.js";
import { displayMessage } from "../../common/displayMessage.js";
import { setupBackToTopButton } from "../buttons/backToTopButton.js";

let currentPage = 1;
const perPage = 10;
let additionalPosts = []; // To keep track of additional posts

function toggleButtonVisibility(button, isVisible) {
  if (button) button.style.display = isVisible ? "block" : "none";
}

function setupButtons() {
  const morePostsButton = document.getElementById("more-posts-button");
  const hidePostsButton = document.getElementById("hide-posts-button");
  const backToTopButton = document.getElementById("back-to-top-button");

  if (morePostsButton) {
    morePostsButton.addEventListener("click", async () => {
      currentPage += 1;

      try {
        const morePosts = await fetchBlogPosts(currentPage, perPage);
        const element = document.querySelector("#posts-container");

        if (!morePosts.length) {
          console.error("No more posts available");
          displayMessage(
            "#notification-message",
            "error",
            "No more blogposts available"
          );
          toggleButtonVisibility(morePostsButton, false);
          return;
        }

        const postHtml = morePosts.map(createHtmlForPost);
        postHtml.forEach((postElement) => {
          additionalPosts.push(postElement);
          element.appendChild(postElement);
        });

        toggleButtonVisibility(hidePostsButton, true);

        if (currentPage * perPage >= getTotalPosts()) {
          toggleButtonVisibility(morePostsButton, false);
          toggleButtonVisibility(backToTopButton, true);
        }
      } catch (error) {
        console.error("Error fetching more posts:", error);
      }
    });
  }

  if (hidePostsButton) {
    hidePostsButton.addEventListener("click", () => {
      const element = document.querySelector("#posts-container");

      additionalPosts.forEach((postElement) => {
        element.removeChild(postElement);
      });

      additionalPosts = [];
      toggleButtonVisibility(hidePostsButton, false);
      toggleButtonVisibility(morePostsButton, true);

      currentPage -= 1;
    });
  }

  setupBackToTopButton(); // Initialize the back-to-top button
}

async function initialRender() {
  const morePostsButton = document.getElementById("more-posts-button");

  try {
    const initialPosts = await fetchBlogPosts(1, perPage);
    await renderBlogPosts(
      "#posts-container",
      initialPosts,
      currentPage,
      perPage
    );

    if (currentPage * perPage < getTotalPosts()) {
      toggleButtonVisibility(morePostsButton, true);
    }
  } catch (error) {
    console.error("Failed to load initial posts:", error);
    displayMessage(
      "#notification-message",
      "error",
      "There was an error fetching the blogposts"
    );
  }
}

export function initializeButtons() {
  document.addEventListener("DOMContentLoaded", () => {
    setupButtons();
    initialRender();
  });
}
