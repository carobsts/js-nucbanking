let backButtonEl = document.getElementById('back-button');
let balanceElement = document.getElementById('balance');
let cbuElement = document.getElementById('cbu');

backButtonEl.addEventListener('click', () => location.href = "../index.html");
balanceElement.addEventListener('click', () => location.href = "balance.html");
cbuElement.addEventListener('click', () => location.href = "cbu.html");