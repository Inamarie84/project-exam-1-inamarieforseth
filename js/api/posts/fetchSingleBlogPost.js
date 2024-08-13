import { BASE_URL } from "../../constants/api.js";

export async function fetchSinglePost(postId) {
  try {
    const url = `${BASE_URL}/wp/v2/posts/${postId}?_embed`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch the single post");
    }
    const data = await response.json();
    console.log("Fetched post data:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch the single post:", error);
    throw error;
  }
}
