import { fetchPosts } from "../../api/posts/fetchPosts.js";

export async function fetchLatestPosts(page = 1, perPage = 4) {
  try {
    const { data, totalPosts } = await fetchPosts(page, perPage);
    return { data, totalPosts };
  } catch (error) {
    throw new Error("Failed to fetch latest posts: " + error.message);
  }
}
