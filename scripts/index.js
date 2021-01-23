let requestsElement = document.getElementById('requests');
let servicesElement = document.getElementById('services');
let depositsElement = document.getElementById('deposits');
let transfersElement = document.getElementById('transfers');
let logoutElement = document.getElementById('logout');

let welcomeElement = document.getElementById('welcome-title');

let localStore = localStorage.getItem('user');
let user = JSON.parse(localStore);

function saveState(link) {
    location.href = link;  
}

if (user) {
    welcomeElement.innerHTML = `¡Bienvenid@, ${user.name}!`;
    requestsElement.addEventListener('click', () => saveState('./requests/index.html'));
    servicesElement.addEventListener('click', () => saveState('./services/index.html'));
    depositsElement.addEventListener('click', () => saveState('./deposits/index.html'));
    transfersElement.addEventListener('click', () => saveState('./transfers/index.html'));
} else {
    location.href = "./users/login.html";
    requestsElement.addEventListener('click', () => saveState('./users/login.html'));
    servicesElement.addEventListener('click', () => saveState('./users/login.html'));
    depositsElement.addEventListener('click', () => saveState('./users/login.html'));
    transfersElement.addEventListener('click', () => saveState('./users/login.html'));
}

logoutElement.addEventListener('click', () => {
    localStorage.removeItem('user');
    location.href = "./users/login.html"
});