// utilities.js
export function extractFeaturedImageUrl(embedded) {
  if (
    embedded &&
    embedded["wp:featuredmedia"] &&
    embedded["wp:featuredmedia"][0] &&
    embedded["wp:featuredmedia"][0].source_url
  ) {
    return embedded["wp:featuredmedia"][0].source_url;
  }
  return null;
}

export function removeImagesAndFigcaptionsFromContent(content) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content;

  const images = tempDiv.querySelectorAll("img");
  images.forEach((img) => img.remove());

  const figcaptions = tempDiv.querySelectorAll("figcaption");
  figcaptions.forEach((figcaption) => figcaption.remove());

  return tempDiv.innerHTML;
}
