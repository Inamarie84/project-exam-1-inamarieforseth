// export function displayMessage(targetElement, messageType, message) {
//   const element = document.querySelector(targetElement);
//   element.innerHTML = `<div class="notification-message ${messageType}">${message}</div>`;
// }

export function displayMessage(targetElement, messageType, message) {
  const element = document.querySelector(targetElement);
  if (!element) {
    console.error(`Element not found: ${targetElement}`);
    return;
  }
  element.innerHTML = `<div class="notification-message ${messageType}">${message}</div>`;
}
