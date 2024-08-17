import { BASE_URL } from "../../constants/api.js";

let totalPosts = 0;

export async function fetchPosts(page, perPage) {
  const endpoint = "/wp/v2/posts?_embed";
  const url = `${BASE_URL}${endpoint}&page=${page}&per_page=${perPage}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  const total = parseInt(response.headers.get("X-WP-Total"), 10);
  totalPosts = total;
  return { data, totalPosts: total };
}

export async function fetchBlogPosts(page, perPage) {
  try {
    const { data } = await fetchPosts(page, perPage);
    return data;
  } catch (error) {
    throw error;
  }
}

export function getTotalPosts() {
  return totalPosts;
}
