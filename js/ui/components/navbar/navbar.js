export function initializeNavbar() {
  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");

    // nav element
    const nav = document.createElement("nav");
    nav.classList.add("navbar");

    // wrapper to align menu and mobile menu button
    const navWrapper = document.createElement("div");
    navWrapper.classList.add("navbar-wrapper");

    // the menu
    const menu = document.createElement("ul");
    menu.classList.add("navbar-menu");

    // menu items
    const menuItems = ["Home", "Runcation", "About", "Contact"];
    const menuLinks = [
      "/index.html",
      "/blogposts.html",
      "/about.html",
      "/contact.html",
    ];

    // append menu items to the menu
    menuItems.forEach((item, index) => {
      const menuItem = document.createElement("li");
      const menuLink = document.createElement("a");
      menuLink.href = menuLinks[index];
      menuLink.textContent = item;
      menuItem.appendChild(menuLink);
      menu.appendChild(menuItem);
    });

    // mobile menu button
    const mobileMenuButton = document.createElement("div");
    mobileMenuButton.classList.add("navbar-toggle");
    mobileMenuButton.id = "mobile-menu";
    for (let i = 0; i < 3; i++) {
      const bar = document.createElement("span");
      bar.classList.add("bar");
      mobileMenuButton.appendChild(bar);
    }

    // append the menu and mobile button to the navWrapper
    navWrapper.appendChild(menu);
    navWrapper.appendChild(mobileMenuButton);

    // append the navWrapper to the nav
    nav.appendChild(navWrapper);

    // append the nav to the header
    header.appendChild(nav);

    // Add event listener for mobile menu button
    mobileMenuButton.addEventListener("click", () => {
      menu.classList.toggle("active");
    });

    // Add active class to current page link
    const currentLocation = location.pathname;
    const menuLinksElements = menu.querySelectorAll("a");

    menuLinksElements.forEach((link) => {
      if (link.pathname === currentLocation) {
        link.classList.add("active");
      }
    });
  });
}
