import { fetchLatestPosts } from "../../api/posts/fetchLatestPosts.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { renderLatestPosts } from "../../ui/posts/renderLatestPosts.js";

let currentPage = 1;
let totalPosts = 0;
let postsPerPage = 4; // Default value

// Function to dynamically update postsPerPage based on screen size
function updatePostsPerPage() {
  if (window.innerWidth < 480) {
    postsPerPage = 1; // 1 post per page for very small screens
  } else if (window.innerWidth < 768) {
    postsPerPage = 2; // 2 posts per page for small screens
  } else if (window.innerWidth < 1024) {
    postsPerPage = 3; // 3 posts per page for medium-sized screens
  } else {
    postsPerPage = 4; // 4 posts per page for larger screens
  }
}

// Function to display latest posts
export async function displayLatestPosts(page = 1) {
  updatePostsPerPage(); // Update postsPerPage on initial load
  try {
    const { data, totalPosts: fetchedTotalPosts } = await fetchLatestPosts(
      page,
      postsPerPage
    );
    totalPosts = fetchedTotalPosts;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const carouselTrack = document.querySelector(".carousel-track");
    if (carouselTrack) {
      carouselTrack.dataset.currentPage = page;
      carouselTrack.dataset.totalPages = totalPages;
    }

    renderLatestPosts(data);
    currentPage = page;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    displayMessage(
      "#notification-message",
      "error",
      "There was an error fetching the latest blogposts"
    );
  }
}

// Event listener for navigation arrows
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("left-arrow")) {
    if (currentPage > 1) {
      displayLatestPosts(currentPage - 1);
    }
  }

  if (event.target.classList.contains("right-arrow")) {
    if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
      displayLatestPosts(currentPage + 1);
    }
  }
});

// Initial load of latest posts on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  displayLatestPosts();
});

// Update postsPerPage on window resize
window.addEventListener("resize", () => {
  updatePostsPerPage();
});
