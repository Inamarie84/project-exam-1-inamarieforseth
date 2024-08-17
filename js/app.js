import { displayBlogPosts } from "./events/posts/displayBlogPosts.js";
import { displaySingleBlogPost } from "./events/posts/displaySingleBlogPost.js";
import { initializeAboutPage } from "./events/posts/displayAboutPage.js";
import { displayLatestPosts } from "./events/posts/displayLatestPosts.js";
import { initializeContactForm } from "./ui/contact/contactForm.js";
import { initializeNavbar } from "./ui/components/navbar/navbar.js";
import { initializeButtons } from "./ui/components/buttons/buttonHandlers.js";
import { hideLoadingIndicator } from "./ui/utilities/hideLoadingIndicator.js";
import { setupBackToTopButton } from "./ui/components/buttons/backToTopButton.js";
import { displayMessage } from "./ui/common/displayMessage.js";

function router() {
  const { pathname } = location;

  initializeNavbar();
  setupBackToTopButton();

  console.log("Current pathname:", pathname);

  try {
    switch (pathname) {
      case "/":
      case "/index.html":
        displayLatestPosts();
        break;
      case "/about.html":
        initializeAboutPage();
        break;
      case "/blogposts.html":
        displayBlogPosts();
        initializeButtons();
        break;
      case "/singleblogpost.html":
        displaySingleBlogPost();
        break;
      case "/contact.html":
        initializeContactForm();
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
