import {
  extractFeaturedImageUrl,
  removeImagesAndFigcaptionsFromContent,
} from "../../utilities/imageUtils.js";

export function createHtmlForPost(post) {
  const { title, content, id, _embedded, date } = post;

  const postContainer = document.createElement("div");
  postContainer.classList.add("post");

  const titleElement = document.createElement("h2");
  titleElement.innerText = title.rendered;
  postContainer.appendChild(titleElement);

  const featuredImageUrl = extractFeaturedImageUrl(_embedded);
  if (featuredImageUrl) {
    const imageElement = document.createElement("img");
    imageElement.src = featuredImageUrl;
    imageElement.classList.add("featured-image");
    postContainer.appendChild(imageElement);
  }

  const dateElement = document.createElement("p");
  dateElement.innerText = date;
  dateElement.classList.add("blogpost-date");
  postContainer.appendChild(dateElement);

  const contentElement = document.createElement("div");
  contentElement.innerHTML = removeImagesAndFigcaptionsFromContent(
    content.rendered
  );
  postContainer.appendChild(contentElement);

  const readMoreLink = document.createElement("a");
  readMoreLink.href = `singleblogpost.html?id=${id}`;
  readMoreLink.textContent = "Read More";
  readMoreLink.classList.add("read-more-link");
  postContainer.appendChild(readMoreLink);

  return postContainer;
}
