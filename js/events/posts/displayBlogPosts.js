import { fetchPosts } from "../../api/posts/fetchBlogPosts.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { renderBlogPosts } from "../../ui/posts/renderBlogPosts.js";

export async function displayBlogPosts() {
  console.log("displayBlogPosts");
  try {
    const page = 1;
    const perPage = 10;
    const { data } = await fetchPosts(page, perPage);
    renderBlogPosts("#posts-container", data);
  } catch (error) {
    console.error("Error fetching or rendering posts:", error);
    displayMessage(
      "#notification-message",
      "error-message",
      "There was an error fetching the blogposts"
    );
  }
}
