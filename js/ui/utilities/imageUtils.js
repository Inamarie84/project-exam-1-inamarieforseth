// imageUtils.js
export function extractFeaturedImageDetails(embedded) {
  if (
    embedded &&
    embedded["wp:featuredmedia"] &&
    embedded["wp:featuredmedia"][0] &&
    embedded["wp:featuredmedia"][0].source_url
  ) {
    return {
      url: embedded["wp:featuredmedia"][0].source_url,
      alt: embedded["wp:featuredmedia"][0].alt_text || "Featured image",
    };
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
