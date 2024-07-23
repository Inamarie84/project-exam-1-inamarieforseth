// import { displayBlogPosts } from "./events/posts/displayBlogPosts.js";
// import { displaySingleBlogPost } from "./events/posts/displaySingleBlogPost.js";
// import { initializeAboutPage } from "./events/posts/displayAboutPage.js";
// import { displayLatestPosts } from "./events/posts/displayLatestPosts.js";
// import { initializeNavbar } from "./ui/components/navbar/navbar.js";
// import { initializeButtons } from "./ui/components/buttons/buttonHandlers.js";

// function router() {
//   const { pathname } = location;

//   initializeNavbar();

//   console.log("Current pathname:", pathname); // Log the pathname for debugging

//   switch (pathname) {
//     case "/":
//     case "/index.html":
//       displayLatestPosts();
//       break;
//     case "/about.html": // Assuming the about page is about.html
//       initializeAboutPage();
//       break;
//     case "/blogposts.html":
//       displayBlogPosts();
//       initializeButtons();
//       break;
//     case "/singleblogpost.html":
//       displaySingleBlogPost();
//       break;
//     default:
//       console.log("No matching route found"); // Handle cases where the path does not match any expected route
//   }

// }

// router();

import { displayBlogPosts } from "./events/posts/displayBlogPosts.js";
import { displaySingleBlogPost } from "./events/posts/displaySingleBlogPost.js";
import { initializeAboutPage } from "./events/posts/displayAboutPage.js";
import { displayLatestPosts } from "./events/posts/displayLatestPosts.js";
import { initializeContactForm } from "./ui/contact/contactForm.js";
import { initializeNavbar } from "./ui/components/navbar/navbar.js";
import { initializeButtons } from "./ui/components/buttons/buttonHandlers.js";
import { hideLoadingIndicator } from "./ui/utilities/hideLoadingIndicator.js";

function router() {
  const { pathname } = location;

  initializeNavbar();

  console.log("Current pathname:", pathname); // Log the pathname for debugging

  try {
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
      case "/contact.html": // Assuming the contact page is contact.html
        initializeContactForm();
        break;
      default:
        console.log("No matching route found"); // Handle cases where the path does not match any expected route
    }
  } catch (error) {
    console.error("Error occurred during routing:", error);
  } finally {
    hideLoadingIndicator();
  }
}

router();
