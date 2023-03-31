const SECRET_KEY = new Uint8Array([
  0x5f, 0xe1, 0xc1, 0x87, 0x06, 0x7c, 0x45, 0xbd, 0xb1, 0x31, 0x41, 0x01, 0xf7,
  0x68, 0x25, 0xef, 0x9b, 0x6d, 0x73, 0x5d, 0x78, 0x34, 0xf7, 0x73, 0x09, 0xf6,
  0x82, 0x80, 0x51, 0x93, 0x01, 0x37,
]);


async function signRequestPayload(payload) {
  const encoder = new TextEncoder();
  const currentTimestamp = new Date().getTime();
  const encodedPayload = JSON.stringify(payload);

  const valuesToSign = [encodedPayload, currentTimestamp.toString()];
  const dataToSign = encoder.encode(valuesToSign.join("."));

  const signatureKey = await crypto.subtle.importKey(
    "raw",
    SECRET_KEY,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", signatureKey, dataToSign);
  const signatureArray = new Uint8Array(signature);
  const signatureEncoded = btoa(
    String.fromCharCode.apply(null, signatureArray)
  );
  const requestInfo = {
    requestInformation: {
      httpSignature: signatureEncoded,
      httpTimestamp: currentTimestamp,
    },
  };
  return JSON.stringify({
    ...payload,
    ...requestInfo,
  });
}


const connectButton = document.getElementById('connectButton');

function setLoggedIn() {
  connectButton.classList.add('logged-in'); 
  connectButton.querySelector('#connectButtonText').innerText = 'LOGOUT'; 
}

function setLoggedOut() {
  connectButton.classList.remove('logged-in');
  connectButton.querySelector('#connectButtonText').innerText = 'CONNECT'; 
}

async function validateConnection() {
  const userWalletAddress = window.localStorage.getItem('userWalletAddress');
  if (userWalletAddress) {
    setLoggedIn(); 
  } else {
    setLoggedOut(); 
  }
}

async function connectWithMetaMask() {
  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const userWalletAddress = accounts[0];

    const payload = {
      walletId: userWalletAddress,
    };
    const response = await fetch(
      'http://localhost:3000/api/v1/auth/authenticate',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: await signRequestPayload(payload),
      }
    );
    const data = await response.json();
    window.localStorage.setItem('userWalletAddress', userWalletAddress);

    validateConnection(); 
    console.log('Connected with MetaMask');
  } catch (error) {
    console.error(error);
  }
}

async function logoutWithMetaMask() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    window.localStorage.removeItem('userWalletAddress');

    if (window.ethereum && window.ethereum.disconnect) {
      window.ethereum.disconnect();
    }

    validateConnection(); 
    console.log('Logged out with MetaMask');
  } catch (error) {
    console.error(error);
  }
}

validateConnection();

window.addEventListener('storage', (event) => {
  if (event.key === 'userWalletAddress' && !event.newValue) {
    console.log('User wallet address removed from local storage');
  }
});

connectButton.addEventListener('click', () => {
  if (connectButton.classList.contains('logged-in')) {
    logoutWithMetaMask();
  } else {
    connectWithMetaMask();
  }
});
