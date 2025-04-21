const uploadBox = document.querySelector(".upload-avatar");
const iconUpload = document.querySelector(".icon-upload");
const inputAvatar = document.getElementById("avatarInput");
const previewImg = document.querySelector(".img-review img");
const removeBtn = document.querySelector(".remove");
const changeBtn = document.querySelector(".change");
const uploadWarning = document.querySelector(".upload-warning");
const form = document.getElementById("user-info-form");

// ------------------ Preview + Validate Avatar ------------------
function showImage(file) {
  if (!validateAvatar(file)) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
    uploadBox.classList.add("uploaded");

    localStorage.setItem("avatar", reader.result);
  };
  reader.readAsDataURL(file);
}

function validateAvatar(file) {
  const validTypes = ["image/jpeg", "image/png"];
  const maxSize = 500 * 1024;

  if (!validTypes.includes(file.type)) {
    uploadWarning.style.display = "none";
    showError("avatar", "Only JPG or PNG files are allowed.");
    return false;
  }

  if (file.size > maxSize) {
    uploadWarning.style.display = "none";
    showError("avatar", "File size must be less than 500KB.");
    return false;
  }

  return true;
}

// ------------------ Upload Events ------------------
iconUpload.addEventListener("click", () => inputAvatar.click());
changeBtn.addEventListener("click", () => inputAvatar.click());

inputAvatar.addEventListener("change", () => {
  const file = inputAvatar.files[0];
  if (file) showImage(file);
  clearError("avatar");
});

uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.classList.add("dragging");
});

uploadBox.addEventListener("dragleave", () => {
  uploadBox.classList.remove("dragging");
});

uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadBox.classList.remove("dragging");
  const file = e.dataTransfer.files[0];
  if (file) {
    inputAvatar.files = e.dataTransfer.files;
    showImage(file);
  }
});

removeBtn.addEventListener("click", () => {
  inputAvatar.value = "";
  previewImg.src = "";
  uploadBox.classList.remove("uploaded");
});

// ------------------ Form Validate + Submit ------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelectorAll(".error").forEach((el) => el.remove());
  let isValid = true;

  const fullName = getValue(
    ".input-name",
    "fullname",
    "Please enter your full name."
  );
  const email = getValue(
    ".input-email",
    "email",
    "Please enter a valid email address.",
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  );
  const github = getValue(
    ".input-github",
    "github",
    "Please enter a valid GitHub username.",
    /^@[a-zA-Z0-9-]{1,39}$/
  );

  if (!fullName || !email || !github) isValid = false;

  const file = inputAvatar.files[0];
  if (!file) {
    uploadWarning.style.display = "none";
    showError("avatar", "Please upload an avatar image.");
    isValid = false;
  } else if (!validateAvatar(file)) {
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully! 🎉");
    form.submit();
  }
});

// ------------------ Validate Input Value ------------------
function getValue(selector, fieldId, errorMessage, regex = null) {
  const input = document.querySelector(selector);
  let value = input.value.trim();

  if (!value || (regex && !regex.test(value))) {
    showError(fieldId, errorMessage);
    return false;
  }

  return value;
}

// ------------------ Error Helpers ------------------
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.createElement("div");
  error.className = "error";
  error.innerHTML = `
    <div class="warning-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
        <path stroke="#f57261" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>
        <path fill="#f57261" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>
        <path stroke="#f57261" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/>
      </svg>
    </div>
    <p class="warning-text">${message}</p>
  `;
  field.appendChild(error);
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const error = field.querySelector(".error");
  if (error) error.remove();
  if (fieldId === "avatar") uploadWarning.style.display = "flex";
}

// ------------------ Clear Error On Typing ------------------
["fullname", "email", "github"].forEach((id) => {
  const input = document.getElementById(id).querySelector("input");
  input.addEventListener("input", () => clearError(id));
});
