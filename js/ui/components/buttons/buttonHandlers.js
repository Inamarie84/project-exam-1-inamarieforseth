import {
  fetchBlogPosts,
  getTotalPosts,
} from "../../../api/posts/fetchBlogPosts.js";
import { renderBlogPosts } from "../../../ui/posts/renderBlogPosts.js";
import { createHtmlForPost } from "../../components/createHtml/createHtmlForBlogPosts.js";

let currentPage = 1;
let perPage = 10;
let additionalPosts = []; // To keep track of additional posts

export function initializeButtons() {
  document.addEventListener("DOMContentLoaded", async () => {
    const morePostsButton = document.getElementById("more-posts-button");
    const hidePostsButton = document.getElementById("hide-posts-button");
    const backToTopButton = document.getElementById("back-to-top-button");
    const postsContainer = document.getElementById("posts-container");

    // Initial load of posts
    try {
      const posts = await fetchBlogPosts(currentPage, perPage);
      await renderBlogPosts("#posts-container", posts, currentPage, perPage);
    } catch (error) {
      console.error("Error during initial load of posts:", error);
    }

    if (morePostsButton) {
      morePostsButton.addEventListener("click", async () => {
        currentPage += 1;

        try {
          const morePosts = await fetchBlogPosts(currentPage, perPage);
          const element = document.querySelector("#posts-container");

          if (!morePosts.length) {
            console.error("No more posts available");
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

    // Event listener for "Hide Posts" button
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

    // Event listener for "Back to Top" button
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

    // Initial render
    fetchBlogPosts(1, perPage)
      .then((initialPosts) => {
        renderBlogPosts("#posts-container", initialPosts, currentPage, perPage);
      })
      .catch((error) => {
        console.error("Failed to load initial posts:", error);
        displayMessage(
          "#message",
          "error",
          "There was an error fetching the blogposts"
        );
      })
      .finally(() => {
        if (morePostsButton) {
          if (currentPage * perPage < getTotalPosts()) {
            morePostsButton.style.display = "block";
          }
        }
      });
  });
}
