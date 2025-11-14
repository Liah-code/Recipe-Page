//THEME MODE

const lightBtn = document.getElementById("theme-toggle-light");
const darkBtn = document.getElementById("theme-toggle-dark");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Initialize theme on page load
const initTheme = () => {
  const isDark = document.documentElement.classList.contains("dark-theme");
  if (isDark) {
    if (darkBtn) darkBtn.classList.add("hidden");
    if (lightBtn) lightBtn.classList.remove("hidden");
  } else {
    if (lightBtn) lightBtn.classList.add("hidden");
    if (darkBtn) darkBtn.classList.remove("hidden");
  }
};

if (lightBtn) {
  lightBtn.addEventListener("click", () => {
    document.documentElement.classList.add("dark-theme");
    lightBtn.classList.add("hidden");
    if (darkBtn) darkBtn.classList.remove("hidden");
    localStorage.setItem("theme", "dark");
  });
}

if (darkBtn) {
  darkBtn.addEventListener("click", () => {
    document.documentElement.classList.remove("dark-theme");
    darkBtn.classList.add("hidden");
    if (lightBtn) lightBtn.classList.remove("hidden");
    localStorage.setItem("theme", "light");
  });
}

window.addEventListener("DOMContentLoaded", initTheme);

//input field
const subscribeBox = document.getElementById("form");
const inputName = document.getElementById("fullname-input");
const inputEmail = document.getElementById("email-input");
const subscribeBtn = document.getElementById("subscribe-btn");

const validEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const setError = (element, message) => {
  const inputWrapper = element.parentElement.parentElement;
  const errorDisplay = inputWrapper.nextElementSibling;

  errorDisplay.innerText = message;
  errorDisplay.classList.remove("hidden");
};

const clearError = (element) => {
  const inputWrapper = element.parentElement.parentElement;
  const errorDisplay = inputWrapper.nextElementSibling;

  errorDisplay.innerText = "";
  errorDisplay.classList.add("hidden");
};

const successMsg = (message) => {
  if (!subscribeBox) return;
  const successDisplay = subscribeBox.querySelector(".text-green-500");
  if (!successDisplay) return;
  successDisplay.innerText = message;
  successDisplay.classList.remove("hidden");
};

const hideSuccess = () => {
  if (!subscribeBox) return;
  const successDisplay = subscribeBox.querySelector(".text-green-500");
  if (!successDisplay) return;
  successDisplay.innerText = "";
  successDisplay.classList.add("hidden");
};

const validateInputs = () => {
  let valid = true;
  hideSuccess();

  if (!inputName || inputName.value.trim() === "") {
    if (inputName) setError(inputName, "Please enter your Full Name");
    valid = false;
  } else {
    if (inputName) clearError(inputName);
  }

  if (!inputEmail || inputEmail.value.trim() === "") {
    if (inputEmail) setError(inputEmail, "Please enter your email");
    valid = false;
  } else if (!validEmail(inputEmail.value.trim())) {
    if (inputEmail) setError(inputEmail, "Please enter a valid email");
    valid = false;
  } else {
    if (inputEmail) clearError(inputEmail);
  }

  return valid;
};

if (subscribeBtn) {
  subscribeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (validateInputs()) {
      successMsg("You have successfully subscribed!");
      if (inputName) inputName.value = "";
      if (inputEmail) inputEmail.value = "";
    }
  });
}
