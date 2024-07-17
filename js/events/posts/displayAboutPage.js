import {
  fetchPostTitles,
  fetchImages,
} from "../../api/about/fetchPostTitles.js";
import {
  renderPostTitles,
  renderImages,
} from "../../ui/posts/renderPostTitles.js";

export function initializeAboutPage() {
  async function init() {
    try {
      const [titles, images] = await Promise.all([
        fetchPostTitles(),
        fetchImages(),
      ]);
      renderPostTitles(titles);
      renderImages(images);
    } catch (error) {
      console.error("Error initializing about page:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
}

// initializeAboutPage();
