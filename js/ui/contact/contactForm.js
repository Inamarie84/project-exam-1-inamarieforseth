import { displayMessage } from "../common/displayMessage.js";

export function initializeContactForm() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const notificationElement = "#notification-message";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isFormValid = true;

    if (!isNameValid()) {
      isFormValid = false;
    }

    if (!isEmailValid()) {
      isFormValid = false;
    }

    if (!isSubjectValid()) {
      isFormValid = false;
    }

    if (!isMessageValid()) {
      isFormValid = false;
    }

    if (isFormValid) {
      displayMessage(
        notificationElement,
        "success",
        "Form submitted successfully!"
      );
      form.reset();
    } else {
      displayMessage(
        notificationElement,
        "error",
        "Please correct the errors in the form."
      );
    }
  });

  function isNameValid() {
    const name = nameInput.value.trim();
    const nameError = document.getElementById("nameError");

    if (name.length < 5) {
      nameError.textContent = "Name must be more than 5 characters long";
      return false;
    } else {
      nameError.textContent = "";
      return true;
    }
  }

  function isEmailValid() {
    const email = emailInput.value.trim();
    const emailError = document.getElementById("emailError");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      emailError.textContent = "Please enter a valid email address";
      return false;
    } else {
      emailError.textContent = "";
      return true;
    }
  }

  function isSubjectValid() {
    const subject = subjectInput.value.trim();
    const subjectError = document.getElementById("subjectError");

    if (subject.length < 15) {
      subjectError.textContent = "Subject must be more than 15 characters long";
      return false;
    } else {
      subjectError.textContent = "";
      return true;
    }
  }

  function isMessageValid() {
    const message = messageInput.value.trim();
    const messageError = document.getElementById("messageError");

    if (message.length < 25) {
      messageError.textContent = "Message must be more than 25 characters long";
      return false;
    } else {
      messageError.textContent = "";
      return true;
    }
  }

  nameInput.addEventListener("input", isNameValid);
  emailInput.addEventListener("input", isEmailValid);
  subjectInput.addEventListener("input", isSubjectValid);
  messageInput.addEventListener("input", isMessageValid);
}
