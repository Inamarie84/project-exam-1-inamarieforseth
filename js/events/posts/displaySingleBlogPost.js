import { renderSingleBlogPost } from "../../ui/posts/renderSingleBlogPost.js";
import { fetchSinglePost } from "../../api/posts/fetchSingleBlogPost.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

export async function displaySingleBlogPost() {
  async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    console.log("URL Params:", urlParams.toString());
    console.log("Post ID:", postId);

    if (!postId) {
      console.error("No post ID found in URL");
      return;
    }

    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) loadingIndicator.style.display = "block";

    try {
      const post = await fetchSinglePost(postId);
      console.log("Fetched single post:", post);

      // Update the page title
      document.title = `Run The World | ${post.title.rendered}`;

      renderSingleBlogPost("#singlepost-container", post);
    } catch (error) {
      console.error("Failed to load single post:", error);
      displayMessage(
        "#message",
        "error",
        "There was an error fetching the blogpost"
      );
    } finally {
      if (loadingIndicator) loadingIndicator.style.display = "none";
    }
  }

  document.addEventListener("DOMContentLoaded", init);
}
