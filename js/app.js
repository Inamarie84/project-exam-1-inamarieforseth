import { displayBlogPosts } from "./events/posts/displayBlogPosts.js";
import { displaySingleBlogPost } from "./events/posts/displaySingleBlogPost.js";
import { initializeAboutPage } from "./events/posts/displayAboutPage.js";
import { displayLatestPosts } from "./events/posts/displayLatestPosts.js";
import { initializeContactForm } from "./ui/contact/contactForm.js";
import { initializeNavbar } from "./ui/components/navbar/navbar.js";
import { initializeButtons } from "./ui/components/buttons/buttonHandlers.js";
import {
  hideLoadingIndicator,
  showLoadingIndicator,
} from "./ui/utilities/loadingIndicator.js";
import { setupBackToTopButton } from "./ui/components/buttons/backToTopButton.js";
import { displayMessage } from "./ui/common/displayMessage.js";

async function router() {
  const { pathname } = location;

  showLoadingIndicator();

  initializeNavbar();
  setupBackToTopButton();

  console.log("Current pathname:", window.location.pathname);

  try {
    switch (pathname) {
      case "/":
      case "/index.html":
        await displayLatestPosts();
        break;
      case "/about.html":
        await initializeAboutPage();
        break;
      case "/posts.html":
        await displayBlogPosts(); // No await if this is synchronous
        await initializeButtons(); // No await if this is synchronous
        break;
      case "/post.html":
        await displaySingleBlogPost();
        break;
      case "/contact.html":
        await initializeContactForm();
        break;
      default:
        console.log("No matching route found");
    }
  } catch (error) {
    displayMessage(
      "#notification-message",
      "error",
      "An unexpected error occurred. Please try again later."
    );
  } finally {
    hideLoadingIndicator();
  }
}

router();
