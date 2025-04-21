const params = new URLSearchParams(window.location.search);
const fullName = params.get("fullname");
const email = params.get("email");
const github = params.get("github");
const headName = document.querySelector(".head-name");
const headEmail = document.querySelector(".head-email");
const username = document.querySelector(".user-name");
const githubUserName = document.querySelector(".github-username");
const avatar = document.getElementById("avatar-preview");
const avatarBase64 = localStorage.getItem("avatar");

if (fullName) {
  headName.innerText = fullName;
  username.innerText = fullName;
}
if (email) {
  headEmail.innerText = email;
}
if (github) {
  githubUserName.innerText = github;
}
if (avatarBase64) {
  avatar.src = avatarBase64;
}

const dateElement = document.querySelector(".date");
const options = { year: "numeric", month: "short", day: "numeric" };
const today = new Date().toLocaleDateString("en-US", options);
dateElement.textContent = `${today} / Austin, TX`;

const ticketElement = document.querySelector(".ticket-right");
const randomTicketNumber = Math.floor(Math.random() * 100000);
ticketElement.textContent = `#${randomTicketNumber
  .toString()
  .padStart(5, "0")}`;
