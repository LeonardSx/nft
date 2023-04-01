async function logoutWithMetaMask() {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
  
      window.localStorage.removeItem("userWalletAddress");
  
      if (window.ethereum && window.ethereum.disconnect) {
        window.ethereum.disconnect();
      }
  
      window.location.href = "index.html";
  
      console.log("Logged out with MetaMask");
    } catch (error) {
      console.error(error);
    }
  }