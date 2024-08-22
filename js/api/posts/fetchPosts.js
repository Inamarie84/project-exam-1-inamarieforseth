import { BASE_URL } from "../../constants/api.js";

export async function fetchPosts(page = 1, perPage = 10) {
  const endpoint = `/wp/v2/posts?_embed&page=${page}&per_page=${perPage}`;
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    const totalPosts = parseInt(response.headers.get("X-WP-Total"), 10);

    return { data, totalPosts };
  } catch (error) {
    throw error;
  }
}
