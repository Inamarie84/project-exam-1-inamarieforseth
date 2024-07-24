import {
  fetchBlogPosts,
  getTotalPosts,
} from "../../../api/posts/fetchBlogPosts.js";
import { renderBlogPosts } from "../../../ui/posts/renderBlogPosts.js";
import { createHtmlForPost } from "../../components/createHtml/createHtmlForBlogPosts.js";
import { displayMessage } from "../../common/displayMessage.js";

let currentPage = 1;
const perPage = 10;
let additionalPosts = []; // To keep track of additional posts

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
          return;
        }

        const postHtml = morePosts.map(createHtmlForPost);
        postHtml.forEach((postElement) => {
          additionalPosts.push(postElement);
          element.appendChild(postElement);
        });

        // Show the "Hide Posts" button
        if (hidePostsButton) hidePostsButton.style.display = "block";

        // Hide button if all pages are loaded
        if (currentPage * perPage >= getTotalPosts()) {
          morePostsButton.style.display = "none";
          // Show the "Back to Top" button when all posts are loaded
          if (backToTopButton) backToTopButton.style.display = "block";
        }
      } catch (error) {
        console.error("Error fetching more posts:", error);
      }
    });
  }

  if (hidePostsButton) {
    hidePostsButton.addEventListener("click", () => {
      const element = document.querySelector("#posts-container");

      // Remove additional posts from the DOM
      additionalPosts.forEach((postElement) => {
        element.removeChild(postElement);
      });

      // Clear the additional posts array
      additionalPosts = [];

      // Hide the "Hide Posts" button
      hidePostsButton.style.display = "none";

      // Show the "More Posts" button again
      if (morePostsButton) morePostsButton.style.display = "block";

      // Reset currentPage to load the correct next page when "More Posts" is clicked again
      currentPage -= 1;
    });
  }

  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Hide the "Hide Posts" button and "Back to Top" button when scrolling to the top
      if (hidePostsButton) hidePostsButton.style.display = "none";
      if (backToTopButton) backToTopButton.style.display = "none";
    });
  }

  // Show "Back to Top" button when scrolling to the bottom
  window.addEventListener("scroll", () => {
    if (backToTopButton) {
      if (window.scrollY === 0) {
        // Hide the "Back to Top" button and "Hide Posts" button when at the top
        backToTopButton.style.display = "none";
        if (hidePostsButton) hidePostsButton.style.display = "none";
      } else if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight
      ) {
        // Show the "Back to Top" button when scrolling to the bottom
        backToTopButton.style.display = "block";
      }
    }
  });
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
      morePostsButton.style.display = "block";
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
