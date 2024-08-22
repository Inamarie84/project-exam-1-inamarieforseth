import { fetchBlogPosts } from "../../../api/posts/fetchBlogPosts.js";
import { createHtmlForPost } from "../../components/createHtml/createHtmlForBlogPosts.js";
import { displayMessage } from "../../common/displayMessage.js";
import { toggleButtonVisibility } from "../../utilities/buttonUtils.js";

let currentPage = 1;
const perPage = 10;
let additionalPosts = [];
let totalPosts = 0;
let isFetching = false;

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
      if (isFetching) return;
      isFetching = true;

      currentPage += 1;

      try {
        const { data: morePosts, totalPosts: fetchedTotalPosts } =
          await fetchBlogPosts(currentPage, perPage);

        if (!morePosts || morePosts.length === 0) {
          displayMessage(
            "#notification-message",
            "error",
            "No more blogposts available"
          );
          toggleButtonVisibility(morePostsButton, false);
          return;
        }

        const element = document.querySelector("#posts-container");
        const postHtml = morePosts.map(createHtmlForPost);
        postHtml.forEach((postElement) => {
          additionalPosts.push(postElement);
          element.appendChild(postElement);
        });

        if (hidePostsButton) {
          toggleButtonVisibility(hidePostsButton, true);
        }

        if (currentPage * perPage >= fetchedTotalPosts) {
          toggleButtonVisibility(morePostsButton, false);
        }
      } catch (error) {
        displayMessage(
          "#notification-message",
          "error",
          "Failed to load more blogposts"
        );
      } finally {
        isFetching = false;
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

      if (morePostsButton) {
        toggleButtonVisibility(morePostsButton, true);
      }

      currentPage -= 1;
      updateButtonVisibility();
    });
  }

  window.addEventListener("scroll", updateButtonVisibility);
}

export function initializeButtons() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setupButtons();
    });
  } else {
    setupButtons();
  }
}
