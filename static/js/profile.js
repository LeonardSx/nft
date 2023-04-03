const apiUrl = "https://www.bengbenggaming.com/wp-content/uploads/2022/03/NFT-Avatar-1.jpg"
const avatarImg = document.getElementById("avatar-img");
avatarImg.src = apiUrl;
avatarImg.alt = "avatar";

const avatarDiv = document.getElementById("avatar-container");

avatarDiv.appendChild(avatarImg);