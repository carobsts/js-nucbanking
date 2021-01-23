let subscribeElement = document.getElementById('subscribe');
let unsubscribeElement = document.getElementById('unsubscribe');
let paymentElement = document.getElementById('payment');
let ticketsElement = document.getElementById('tickets');
let backButtonElement = document.getElementById('back-button');

let localStore = localStorage.getItem('user');
let user = JSON.parse(localStore);

function saveState(link) {
    location.href = link;  
}

backButtonElement.addEventListener('click', () => location.href = "../index.html");
subscribeElement.addEventListener('click', () => saveState('./subscribement.html'));
unsubscribeElement.addEventListener('click', () => saveState('./unsubscribement.html'));
paymentElement.addEventListener('click', () => saveState('./payment.html'));
ticketsElement.addEventListener('click', () => saveState('./tickets.html'));