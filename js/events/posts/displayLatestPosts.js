import { fetchLatestPosts } from "../../api/posts/fetchLatestPosts.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { renderLatestPosts } from "../../ui/posts/renderLatestPosts.js";

let currentPage = 1;
let totalPosts = 0;
let postsPerPage = 4;

function updatePostsPerPage() {
  if (window.innerWidth < 480) {
    postsPerPage = 1;
  } else if (window.innerWidth < 768) {
    postsPerPage = 2;
  } else if (window.innerWidth < 1024) {
    postsPerPage = 3;
  } else {
    postsPerPage = 4;
  }
}

export async function displayLatestPosts(page = 1) {
  updatePostsPerPage();
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
    displayMessage(
      "#notification-message",
      "error",
      "There was an error fetching the latest blogposts"
    );
  }
}

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

document.addEventListener("DOMContentLoaded", () => {
  displayLatestPosts();
});

window.addEventListener("resize", () => {
  updatePostsPerPage();
});
