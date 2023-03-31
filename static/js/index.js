const SECRET_KEY = new Uint8Array([
  0x5f, 0xe1, 0xc1, 0x87, 0x06, 0x7c, 0x45, 0xbd, 0xb1, 0x31, 0x41, 0x01,
  0xf7, 0x68, 0x25, 0xef, 0x9b, 0x6d, 0x73, 0x5d, 0x78, 0x34, 0xf7, 0x73,
  0x09, 0xf6, 0x82, 0x80, 0x51, 0x93, 0x01, 0x37,
]);

const loginButton = document.getElementById('loginButton');
const loginButtonText = document.getElementById('loginButtonText');
const navItems = document.querySelectorAll('.menu li:not(:last-child)');

function showWhenNotLoggedIn() {
  document.querySelectorAll('.when-not-logged-in').forEach(item => {
    item.classList.add('show');
  });
  document.querySelectorAll('.when-logged-in').forEach(item => {
    item.classList.remove('show');
  });
}

function showWhenLoggedIn() {
  document.querySelectorAll('.when-logged-in').forEach(item => {
    item.classList.add('show');
  });
  document.querySelectorAll('.when-not-logged-in').forEach(item => {
    item.classList.remove('show');
  });
}


async function toggleButtonLogin() {
  const userWalletAddress = localStorage.getItem('userWalletAddress');

	if (userWalletAddress) {
     await logoutWithMetaMask();
	} else { 
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


      localStorage.setItem('userWalletAddress', payload.walletId);
      loginButtonText.textContent = 'LOGOUT';
      loginButton.removeEventListener('click', toggleButtonLogin);
      loginButton.addEventListener('click', toggleButtonLogin);
	  
    showWhenLoggedIn();
  } catch (error) {
      console.error(error);
      alert('Ha ocurrido un error al acceder a su cuenta de MetaMask.');
  }
 }
}

function init() {
  const userWalletAddress = localStorage.getItem('userWalletAddress');
  if (userWalletAddress) {
    showWhenLoggedIn();
  } else {
    showWhenNotLoggedIn();
    enableLoginButton();
  }
}

init();


function disableLoginButton() {
  loginButton.classList.add(
      'bg-gray-500',
      'text-gray-100',
      'cursor-not-allowed'
  );
  loginButton.removeEventListener('click', toggleButtonLogin);
  loginButton.removeEventListener('click', logoutWithMetaMask);
  loginButtonText.textContent = 'CONNECT METAMASK';
}

function enableLoginButton() {
  loginButton.classList.remove(
      'bg-gray-500',
      'text-gray-100',
      'cursor-not-allowed'
  );
  loginButton.addEventListener('click', toggleButtonLogin);
  loginButton.removeEventListener('click', logoutWithMetaMask);
  loginButtonText.textContent = 'CONNECT METAMASK';
}


async function signRequestPayload(payload) {
  const encoder = new TextEncoder();
  const currentTimestamp = new Date().getTime();
  const encodedPayload = JSON.stringify(payload);

  const valuesToSign = [encodedPayload, currentTimestamp.toString()];
  const dataToSign = encoder.encode(valuesToSign.join('.'));

  const signatureKey = await crypto.subtle.importKey(
      'raw',
      SECRET_KEY,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
  );
  const signature = await crypto.subtle.sign(
      'HMAC',
      signatureKey,
      dataToSign
  );
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
async function loginWithMetaMask() {
  try {
      const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
      });
      const userWalletAddress = accounts[0];
      console.log('Cuenta del usuario:', userWalletAddress);

      // Make API call
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

      window.location.hash = '#home';
      loginButtonText.textContent = 'LOGOUT';
      loginButton.removeEventListener('click', loginWithMetaMask);
      loginButton.addEventListener('click', logoutWithMetaMask);
  } catch (error) {
      console.error(error);
      alert('Ha ocurrido un error al acceder a su cuenta de MetaMask.');
  }

}

async function logoutWithMetaMask() {
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

  enableLoginButton();
}


loginButton.addEventListener('click', toggleButtonLogin);
