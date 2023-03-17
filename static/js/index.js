/*
window.userWalletAddress = null;
const loginButton = document.getElementById("connect-metamask-btn");
const titulowallet = document.getElementById("titulo_wallet");
function toggleButtonLogin() {
  if (!window.ethereum) {
    titulowallet.innerText = "MetaMask is not installed";
    loginButton.classList.add(
      "bg-gray-500",
      "text-gray-100",
      "cursor-not-allowed"
    );
    return false;
  }
  loginButton.addEventListener("click", loginWithMetaMask);
}

function toggleButtonsignOut() {
  if (!window.ethereum) {
    titulowallet.innerText = "MetaMask is not installed";
    loginButton.classList.add(
      "bg-gray-500",
      "text-gray-100",
      "cursor-not-allowed"
    );
    return false;
  }
  loginButton.addEventListener("click", signOutOfMetaMask);
}

async function loginWithMetaMask() {
  const accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((e) => {
      console.error(e.message);
      return;
    });
  if (!accounts) {
    return;
  }

  window.userWalletAddress = accounts[0];
  titulowallet.innerText = "Sign out";

  const request = await fetch("<%= process.env.HOST %>/auth/v1/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wallet: window.userWalletAddress,
      referred: "<%= referidoId %>",
    }),
  });
  response = request.text();
  window.location = "/inventory";
  loginButton.removeEventListener("click", loginWithMetaMask);
  setTimeout(() => {
    loginButton.addEventListener("click", signOutOfMetaMask);
  }, 200);
}
function redireccionarPagina() {
  window.location = "/";
}
function signOutOfMetaMask() {
  window.userWalletAddress = null;
  titulowallet.innerText = "Connect Wallet";
  window.location = "/logout";
  loginButton.removeEventListener("click", signOutOfMetaMask);
  setTimeout(() => {
    loginButton.addEventListener("click", loginWithMetaMask);
  }, 200);
}

const ajax = async (config) => {
  const request = await fetch(config.url, {
    method: config.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config.payload),
  });
  response = await request.json();
};

window.addEventListener("DOMContentLoaded", () => {
  toggleButtonLogin();
});

*/
  // Obtener todos los botones de los acordeones
 