import { updateArrows } from "../utilities/carouselUtils.js";

export function renderLatestPosts(posts) {
  const carouselTrack = document.querySelector(".carousel-track");
  if (!carouselTrack) return;

  carouselTrack.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("carousel-item");

    const featuredMedia = post._embedded["wp:featuredmedia"];
    const imageUrl =
      featuredMedia && featuredMedia[0] && featuredMedia[0].source_url
        ? featuredMedia[0].source_url
        : "default-image-url.jpg";

    postElement.innerHTML = `
      <img src="${imageUrl}" alt="${post.title.rendered}">
      <h3>${post.title.rendered}</h3>
    `;

    const readMoreLink = document.createElement("a");
    readMoreLink.href = `post.html?id=${post.id}`;
    readMoreLink.textContent = "Read More";
    readMoreLink.classList.add("read-more-link");

    postElement.appendChild(readMoreLink);

    carouselTrack.appendChild(postElement);
  });

  updateArrows();
}
