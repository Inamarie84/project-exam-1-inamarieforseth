export function extractFeaturedImageUrl(embedded) {
  if (
    embedded &&
    Array.isArray(embedded["wp:featuredmedia"]) &&
    embedded["wp:featuredmedia"][0] &&
    typeof embedded["wp:featuredmedia"][0].source_url === "string"
  ) {
    return embedded["wp:featuredmedia"][0].source_url;
  }
  return null;
}

export function extractTermImages(embedded) {
  const images = [];
  if (embedded && Array.isArray(embedded["wp:term"])) {
    embedded["wp:term"].forEach((term) => {
      if (term && typeof term.source_url === "string") {
        images.push(term.source_url);
      }
    });
  }
  return images;
}
