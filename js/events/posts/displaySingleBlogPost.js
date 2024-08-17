import { renderSingleBlogPost } from "../../ui/posts/renderSingleBlogPost.js";
import { fetchSinglePost } from "../../api/posts/fetchSingleBlogPost.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

export async function displaySingleBlogPost() {
  async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
      displayMessage(
        "#notification-message",
        "error",
        "No post ID found in URL"
      );
      return;
    }

    try {
      const post = await fetchSinglePost(postId);

      document.title = `Run The World | ${post.title.rendered}`;

      renderSingleBlogPost("#singlepost-container", post);
    } catch (error) {
      displayMessage(
        "#notification-message",
        "error",
        "There was an error fetching the blogpost"
      );
    }
  }

  document.addEventListener("DOMContentLoaded", init);
}
