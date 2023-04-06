async function getBalance() {
  const balanceSpan = document.getElementById("balance");
  try {
    const storedSession = localStorage.getItem("userWalletAddress");
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      const { account, networkVersion, balance } = parsedSession;
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentAccount = accounts[0];
      if (account === currentAccount && networkVersion === "56") {
        balanceSpan.innerText = balance.toFixed(4) + " BNB";
        return;
      }
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const networkVersion = await window.ethereum.request({
      method: "net_version",
    });
    if (networkVersion === "56") {
      const result = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      const wei = parseInt(result, 16);
      const balance = wei / 10 ** 18;
      balanceSpan.innerText = balance.toFixed(4) + " BNB";
      localStorage.setItem(
        "userWalletAddress",
        JSON.stringify({ account, networkVersion, balance })
      );
    } else {
      balanceSpan.innerText = "Network Error";
    }
  } catch (e) {
    console.error(e);
    balanceSpan.innerText = "Error";
  }
}

document.addEventListener("DOMContentLoaded", getBalance);
