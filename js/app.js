import { displayBlogPosts } from "./events/posts/displayBlogPosts.js";
import { displaySingleBlogPost } from "./events/posts/displaySingleBlogPost.js";
import { initializeAboutPage } from "./events/posts/displayAboutPage.js";
import { displayLatestPosts } from "./events/posts/displayLatestPosts.js";
import { initializeNavbar } from "./ui/components/navbar/navbar.js";
import { initializeButtons } from "./ui/components/buttons/buttonHandlers.js";

function router() {
  const { pathname } = location;

  initializeNavbar();

  console.log("Current pathname:", pathname); // Log the pathname for debugging

  switch (pathname) {
    case "/":
    case "/index.html":
      displayLatestPosts();
      break;
    case "/about.html": // Assuming the about page is about.html
      initializeAboutPage();
      break;
    case "/blogposts.html":
      displayBlogPosts();
      initializeButtons();
      break;
    case "/singleblogpost.html":
      displaySingleBlogPost();
      break;
    default:
      console.log("No matching route found"); // Handle cases where the path does not match any expected route
  }
}

router();