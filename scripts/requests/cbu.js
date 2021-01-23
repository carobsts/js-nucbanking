let backButtonElement = document.getElementById('back-button');
let cbuElement = document.getElementById('cbu');

let localStore = localStorage.getItem('user');
let user = JSON.parse(localStore);

cbuElement.innerHTML = `${user.cbu}`;


backButtonElement.addEventListener('click', () => location.href = "index.html");