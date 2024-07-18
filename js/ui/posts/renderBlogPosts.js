import { createHtmlForPost } from "../components/createHtml/createHtmlForBlogPosts.js";
import { getTotalPosts } from "../../api/posts/fetchBlogPosts.js";

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

  if (!posts.length) {
    console.error("No posts available to render");
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

// //renderBlogPosts.js
// import { fetchPosts } from "../../api/posts/fetchBlogPosts.js";

// // Global variables
// let currentPage = 1;
// let totalPosts = 0;
// let perPage = 10;

// export async function fetchBlogPosts(page, perPage) {
//   const loadingIndicator = document.getElementById("loading-indicator");
//   loadingIndicator.style.display = "block"; // Show the loading indicator
//   try {
//     const { data, totalPosts: total } = await fetchPosts(page, perPage);
//     console.log("Fetched posts:", data);
//     totalPosts = total; // Update totalPosts
//     return data; // Return fetched posts
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     throw error; // Rethrow the error to be caught in the calling function
//   } finally {
//     loadingIndicator.style.display = "none"; // Hide the loading indicator
//   }
// }

// export async function renderBlogPosts(targetElement, posts = []) {
//   const element = document.querySelector(targetElement);
//   if (!element) {
//     console.error(`Element with selector ${targetElement} not found`);
//     return;
//   }
//   element.innerHTML = ""; // Clear previous posts

//   if (!posts.length) {
//     console.error("No posts available to render");
//     return;
//   }

//   // Create HTML for each post and append to the container
//   const postHtml = posts.map(createHtmlForPost);
//   element.append(...postHtml);

//   // Display "More Posts" button if there are more posts to load
//   const morePostsButton = document.getElementById("more-posts-button");
//   if (morePostsButton) {
//     if (currentPage * perPage < totalPosts) {
//       morePostsButton.style.display = "block";
//     } else {
//       morePostsButton.style.display = "none";
//     }
//   }
// }

// export function createHtmlForPost(post) {
//   const { title, content, id, _embedded } = post;

//   const postContainer = document.createElement("div");
//   postContainer.classList.add("post");

//   // Create and append the title
//   const titleElement = document.createElement("h4");
//   titleElement.innerText = title.rendered;
//   postContainer.appendChild(titleElement);

//   // Extract and append the featured image if available
//   const featuredImageUrl = extractFeaturedImageUrl(_embedded);
//   if (featuredImageUrl) {
//     const imageElement = document.createElement("img");
//     imageElement.src = featuredImageUrl;
//     imageElement.classList.add("featured-image"); // Add class to the image element
//     postContainer.appendChild(imageElement);
//   }

//   // Create and append the content
//   const contentElement = document.createElement("div");
//   contentElement.innerHTML = removeImagesAndFigcaptionsFromContent(
//     content.rendered
//   );
//   postContainer.appendChild(contentElement);

//   // Create a link/button to view the full post
//   const readMoreLink = document.createElement("a");
//   readMoreLink.href = `singleblogpost.html?id=${id}`; // Adjust URL as per your route
//   readMoreLink.textContent = "Read More";
//   readMoreLink.classList.add("read-more-link"); // Add class for styling if needed
//   postContainer.appendChild(readMoreLink);

//   return postContainer;
// }

// function extractFeaturedImageUrl(embedded) {
//   if (
//     embedded &&
//     embedded["wp:featuredmedia"] &&
//     embedded["wp:featuredmedia"][0] &&
//     embedded["wp:featuredmedia"][0].source_url
//   ) {
//     return embedded["wp:featuredmedia"][0].source_url;
//   }
//   return null;
// }

// function removeImagesAndFigcaptionsFromContent(content) {
//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = content;

//   const images = tempDiv.querySelectorAll("img");
//   images.forEach((img) => img.remove());

//   const figcaptions = tempDiv.querySelectorAll("figcaption");
//   figcaptions.forEach((figcaption) => figcaption.remove());

//   return tempDiv.innerHTML;
// }
