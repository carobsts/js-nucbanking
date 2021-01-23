let backButtonEl = document.getElementById('back-button');
let ownAccountElement = document.getElementById('own-account');
let thirdAccountElement = document.getElementById('third-account');

backButtonEl.addEventListener('click', () => location.href = "../index.html");
ownAccountElement.addEventListener('click', () => location.href = "ownAccounts.html");
thirdAccountElement.addEventListener('click', () => location.href = "thirds.html");