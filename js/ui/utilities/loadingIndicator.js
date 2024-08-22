export function showLoadingIndicator() {
  const loadingIndicatorWrapper = document.getElementById(
    "loading-indicator-wrapper"
  );
  if (loadingIndicatorWrapper) {
    loadingIndicatorWrapper.style.display = "flex";
  }
}

export function hideLoadingIndicator() {
  const loadingIndicatorWrapper = document.getElementById(
    "loading-indicator-wrapper"
  );
  if (loadingIndicatorWrapper) {
    loadingIndicatorWrapper.style.display = "none";
  }
}
