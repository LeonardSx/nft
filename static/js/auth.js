const userWalletAddress = window.localStorage.getItem("userWalletAddress");

if (!userWalletAddress) {
  window.location.href = "index.html";
} else if (
  window.location.href.includes("index.html")
) {
  window.location.href = "dashboard.html";
}
