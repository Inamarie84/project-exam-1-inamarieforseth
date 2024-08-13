import {
  fetchBlogPosts,
  getTotalPosts,
} from "../../../api/posts/fetchBlogPosts.js";
import { renderBlogPosts } from "../../../ui/posts/renderBlogPosts.js";
import { createHtmlForPost } from "../../components/createHtml/createHtmlForBlogPosts.js";
import { displayMessage } from "../../common/displayMessage.js";
import { toggleButtonVisibility } from "../../utilities/buttonUtils.js";

let currentPage = 1;
const perPage = 10;
let additionalPosts = [];

function updateButtonVisibility() {
  const hidePostsButton = document.getElementById("hide-posts-button");

  if (hidePostsButton) {
    toggleButtonVisibility(
      hidePostsButton,
      window.scrollY > 0 && additionalPosts.length > 0
    );
  }
}

function setupButtons() {
  const morePostsButton = document.getElementById("more-posts-button");
  const hidePostsButton = document.getElementById("hide-posts-button");

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

      updateButtonVisibility();
    });
  }

  window.addEventListener("scroll", updateButtonVisibility);
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
