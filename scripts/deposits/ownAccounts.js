let backButtonElement = document.getElementById('back-button');
let formElement = document.getElementById('own-account-form');
let cbuElement = document.getElementById('cbu');
let amountElement = document.getElementById('amount');
let reasonElement = document.getElementById('reason');
let errorElement = document.getElementById('own-account-error');

errorElement.style.display = 'none';

let localStore = localStorage.getItem('user');
let user = JSON.parse(localStore);

cbuElement.value = `${user.cbu}`;

function saveDeposit(e) {
    e.preventDefault();

    errorElement.style.display = 'none';

    let localStore = localStorage.getItem('user');
    let user = JSON.parse(localStore);

    let amount = parseInt(amountElement.value);

    if (amount) {
        user = { ...user, balance: parseInt(user.balance + amount) };

        let userToLocal = JSON.stringify(user); 
        localStorage.setItem('user', userToLocal);
        location.href = "index.html";
    } else {
        errorElement.style.display = 'block';
        errorElement.innerHTML = "Por favor, ingresar el monto."
    }
}

backButtonElement.addEventListener('click', () => location.href = "index.html");
formElement.addEventListener('submit', (e) => saveDeposit(e));