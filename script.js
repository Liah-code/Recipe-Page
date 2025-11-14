//THEME MODE

const initThemeToggle = () => {
  const lightBtn = document.getElementById("theme-toggle-light");
  const darkBtn = document.getElementById("theme-toggle-dark");
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;


  if (userTheme === "dark") {
    document.documentElement.classList.add("dark-theme");
  } else if (userTheme === "light") {
    document.documentElement.classList.remove("dark-theme");
  } else if (systemTheme) {
    document.documentElement.classList.add("dark-theme");
  }
  const updateThemeButtons = () => {
    const isDark = document.documentElement.classList.contains("dark-theme");
    if (lightBtn && darkBtn) {
      if (isDark) {
        lightBtn.classList.remove("hidden");
        lightBtn.classList.add("active");
        darkBtn.classList.add("hidden");
        darkBtn.classList.remove("active");
      } else {

        darkBtn.classList.remove("hidden");
        darkBtn.classList.add("active");
        lightBtn.classList.add("hidden");
        lightBtn.classList.remove("active");
      }
    }
  };

  updateThemeButtons();


  if (lightBtn) {
    lightBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
      updateThemeButtons();
    });
  }


  if (darkBtn) {
    darkBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
      updateThemeButtons();
    });
  }
};


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
  initThemeToggle();
}

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
