export function initializeNavbar() {
  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");

    const nav = document.createElement("nav");
    nav.classList.add("navbar");

    const navWrapper = document.createElement("div");
    navWrapper.classList.add("navbar-wrapper");

    const menu = document.createElement("ul");
    menu.classList.add("navbar-menu");
    menu.id = "navbar-menu";

    const menuItems = ["Home", "Runcations", "About", "Contact"];
    const menuLinks = [
      "/index.html",
      "/blogposts.html",
      "/about.html",
      "/contact.html",
    ];

    menuItems.forEach((item, index) => {
      const menuItem = document.createElement("li");
      const menuLink = document.createElement("a");
      menuLink.href = menuLinks[index];
      menuLink.textContent = item;
      menuItem.appendChild(menuLink);
      menu.appendChild(menuItem);
    });

    const mobileMenuButton = document.createElement("button");
    mobileMenuButton.classList.add("navbar-toggle");
    mobileMenuButton.id = "mobile-menu";
    mobileMenuButton.innerHTML = "&#9776;";

    const themeWrapper = document.createElement("div");
    themeWrapper.classList.add("theme-toggle-wrapper");

    const themeToggleButton = document.createElement("button");
    themeToggleButton.id = "theme-toggle";
    themeToggleButton.classList.add("switch-button");

    // Check localStorage for theme preference and set button text
    if (localStorage.getItem("theme") === "nighttime") {
      document.body.classList.add("nighttime");
      themeToggleButton.textContent = "Switch to Daytime";
    } else {
      document.body.classList.remove("nighttime");
      themeToggleButton.textContent = "Switch to Nighttime";
    }

    themeWrapper.appendChild(themeToggleButton); // Wrap the button

    navWrapper.appendChild(mobileMenuButton);
    navWrapper.appendChild(menu);
    navWrapper.appendChild(themeWrapper); // Add the wrapper to the navbar

    nav.appendChild(navWrapper);
    header.appendChild(nav);

    mobileMenuButton.addEventListener("click", () => {
      menu.classList.toggle("active");
    });

    themeToggleButton.addEventListener("click", () => {
      const body = document.body;
      if (body.classList.contains("nighttime")) {
        body.classList.remove("nighttime");
        themeToggleButton.textContent = "Switch to Nighttime";
        localStorage.setItem("theme", "daytime");
      } else {
        body.classList.add("nighttime");
        themeToggleButton.textContent = "Switch to Daytime";
        localStorage.setItem("theme", "nighttime");
      }
    });

    const currentLocation = location.pathname;
    const menuLinksElements = menu.querySelectorAll("a");

    menuLinksElements.forEach((link) => {
      if (link.pathname === currentLocation) {
        link.classList.add("active");
      }
    });
  });
}
