let backButtonElement = document.getElementById('back-button');
let balanceElement = document.getElementById('balance');

let localStore = localStorage.getItem('user');
let user = JSON.parse(localStore);

balanceElement.innerHTML = `$ ${user.balance}`;


backButtonElement.addEventListener('click', () => location.href = "index.html");