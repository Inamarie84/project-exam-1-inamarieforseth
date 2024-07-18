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

export function extractTermImages(embedded) {
  const images = [];
  if (embedded && embedded["wp:term"]) {
    embedded["wp:term"].forEach((term) => {
      if (term.source_url) {
        images.push(term.source_url);
      }
    });
  }
  return images;
}
