const userWalletAddress = window.localStorage.getItem("userWalletAddress");

if (!userWalletAddress && !window.location.href.includes("index.html")) {
  window.location.href = "index.html";
} else if (
  userWalletAddress && window.location.href.includes("index.html")
) {
  window.location.href = "dashboard.html";
}
