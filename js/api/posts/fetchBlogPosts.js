import { fetchPosts } from "../../api/posts/fetchPosts.js";

export async function fetchBlogPosts(page = 1, perPage = 10) {
  try {
    const { data, totalPosts } = await fetchPosts(page, perPage);
    return { data, totalPosts };
  } catch (error) {
    throw new Error("Failed to fetch blog posts: " + error.message);
  }
}
