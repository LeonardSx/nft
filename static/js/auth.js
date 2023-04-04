const USER_WALLET_ADDRESS_KEY = "userWalletAddress";
const EMAIL_SUBMITTED_KEY = "emailSubmitted";
const userWalletAddress = window.localStorage.getItem(USER_WALLET_ADDRESS_KEY);
const emailForm = document.getElementById("emailForm");
const dashboardSection = document.getElementById("dashboard");
const emailInput = document.getElementById("email");

if (!userWalletAddress && !window.location.pathname.endsWith("index.html")) {
  window.location.href = "index.html";
} 
else if (userWalletAddress && window.location.pathname.endsWith("index.html")) {
  window.location.href = "dashboard.html";
} 
else if (userWalletAddress && window.location.pathname.endsWith("dashboard.html") && !localStorage.getItem(EMAIL_SUBMITTED_KEY)) {
  emailForm.classList.remove("hidden");
  dashboardSection.classList.add("hidden");

  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value; 
    localStorage.setItem("email", email);
    localStorage.setItem(EMAIL_SUBMITTED_KEY, true);

    emailForm.classList.add("hidden");
    dashboardSection.classList.remove("hidden");
  });
} 
else if (userWalletAddress && window.location.pathname.endsWith("dashboard.html") && localStorage.getItem(EMAIL_SUBMITTED_KEY)) {
  emailForm.classList.add("hidden");
  dashboardSection.classList.remove("hidden");
}
