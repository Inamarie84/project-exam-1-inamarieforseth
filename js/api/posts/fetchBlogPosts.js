// import { BASE_URL } from "../../constants/api.js";

// // fetchBlogposts.js
// export async function fetchPosts(page, perPage) {
//   const endpoint = "/wp/v2/posts?_embed";
//   const url = `${BASE_URL}${endpoint}&page=${page}&per_page=${perPage}`;
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("Failed to fetch posts");
//   }
//   const data = await response.json();
//   const totalPosts = parseInt(response.headers.get("X-WP-Total"), 10); // Parse as integer
//   return { data, totalPosts };
// }

import { BASE_URL } from "../../constants/api.js";

// Global variable to keep track of the total number of posts
let totalPosts = 0;

// Function to fetch posts from the API
export async function fetchPosts(page, perPage) {
  const endpoint = "/wp/v2/posts?_embed";
  const url = `${BASE_URL}${endpoint}&page=${page}&per_page=${perPage}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  const total = parseInt(response.headers.get("X-WP-Total"), 10); // Parse as integer
  totalPosts = total; // Update the totalPosts variable
  return { data, totalPosts: total };
}

// Function to fetch blog posts with loading indicator management
export async function fetchBlogPosts(page, perPage) {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = "block"; // Show the loading indicator
  try {
    const { data } = await fetchPosts(page, perPage);
    console.log("Fetched posts:", data);
    return data; // Return fetched posts
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error to be caught in the calling function
  } finally {
    loadingIndicator.style.display = "none"; // Hide the loading indicator
  }
}

// Function to get the total number of posts
export function getTotalPosts() {
  return totalPosts;
}
