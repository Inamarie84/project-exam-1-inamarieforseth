export function renderPostTitles(titles) {
  const container = document.querySelector(".about-container");

  if (!container) {
    console.warn("The 'about-container' element was not found.");
    return;
  }

  container.innerHTML = "";

  const list = document.createElement("ul");
  titles.forEach((title) => {
    const listItem = document.createElement("li");
    listItem.textContent = title;
    list.appendChild(listItem);
  });
  container.appendChild(list);

  const readMoreButton = document.createElement("a");
  readMoreButton.href = "posts.html";
  readMoreButton.textContent = "Read More";
  readMoreButton.classList.add("read-more-button");
  container.appendChild(readMoreButton);
}
