import { fetchBlogPosts } from "../../api/posts/fetchBlogPosts.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { renderBlogPosts } from "../../ui/posts/renderBlogPosts.js";

export async function displayBlogPosts() {
  try {
    const page = 1;
    const perPage = 10;
    const data = await fetchBlogPosts(page, perPage);
    renderBlogPosts("#posts-container", data, page, perPage);
  } catch (error) {
    displayMessage(
      "#notification-message",
      "error",
      "There was an error fetching the blog posts."
    );
  }
}
