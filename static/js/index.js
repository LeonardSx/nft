const connect_metamask = document.getElementById("connect_metamask");
const walletTitle = document.getElementById("titulo_wallet");

const API_URL = "<%= process.env.HOST %>/auth/v1/login";
const DEFAULT_REFERRER_ID = "<%= referidoId %>";
const ERROR_META_MASK_NOT_INSTALLED = "MetaMask is not installed";

const toggleLoginButton = () => {
  toggleButton(loginWithMetaMask);
};

const toggleSignOutButton = () => {
  toggleButton(signOutOfMetaMask);
};

const toggleButton = (action) => {
  if (!window.ethereum) {
    walletTitle.innerText = ERROR_META_MASK_NOT_INSTALLED;
    connect_metamask.classList.add("bg-gray-500", "text-gray-100", "cursor-not-allowed");
    return false;
  }
  connect_metamask.removeEventListener("click", loginWithMetaMask);
  connect_metamask.removeEventListener("click", signOutOfMetaMask);
  connect_metamask.addEventListener("click", action);
};

const loginWithMetaMask = async () => {
  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const userWalletAddress = accounts[0];
    walletTitle.innerText = "Sign out";
    await ajax({
      url: API_URL,
      method: "POST",
      payload: {
        wallet: userWalletAddress,
        referred: DEFAULT_REFERRER_ID,
      },
    });
    window.location = "/inventory";
  } catch (error) {
    console.error(error.message);
  }
};

const signOutOfMetaMask = () => {
  window.location = "/logout";
  walletTitle.innerText = "Connect Wallet";
  toggleButton(loginWithMetaMask);
};

const ajax = async ({ url, method, payload }) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
};

const redirectToHomePage = () => {
  window.location = "/";
};

window.addEventListener("DOMContentLoaded", () => {
  toggleLoginButton();
});