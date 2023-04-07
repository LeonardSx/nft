const userWalletAddress = window.localStorage.getItem("userWalletAddress");
const emailForm = document.getElementById("emailForm");
const dashboardSection = document.getElementById("dashboard");
const emailInput = document.getElementById("email");

if (!userWalletAddress && !window.location.pathname.endsWith("index.html")) {
  window.location.href = "index.html";
} 
else if (userWalletAddress && window.location.pathname.endsWith("index.html")) {
  window.location.href = "dashboard.html";
} 
else if (userWalletAddress && window.location.pathname.endsWith("dashboard.html") && !localStorage.getItem("emailSubmitted")) {
  emailForm.classList.remove("hidden");
  dashboardSection.classList.add("hidden");

  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value; 
    localStorage.setItem("email", email);
    localStorage.setItem("emailSubmitted", true);

    emailForm.classList.add("hidden");
    dashboardSection.classList.remove("hidden");
  });
} 
else if (userWalletAddress && window.location.pathname.endsWith("dashboard.html") && localStorage.getItem("emailSubmitted")) {
  emailForm.classList.add("hidden");
  dashboardSection.classList.remove("hidden");
}
