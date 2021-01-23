let backButtonElement = document.getElementById('back-button');
let formElement = document.getElementById('third-account-form');
let cbuElement = document.getElementById('cbu');
let amountElement = document.getElementById('amount');
let reasonElement = document.getElementById('reason');
let errorElement = document.getElementById('third-account-error');

errorElement.style.display = 'none';

let localStore = localStorage.getItem('user');
let user = JSON.parse(localStore);

function saveDeposit(e) {
    e.preventDefault();

    errorElement.style.display = 'none';

    let localStore = localStorage.getItem('user');
    let user = JSON.parse(localStore);

    let cbu = cbuElement.value;
    let amount = parseInt(amountElement.value);

    if (cbu && amount) {
        if (amount < parseInt(user.balance)) {
            user = { ...user, balance: parseInt(user.balance - amount) };

            let userToLocal = JSON.stringify(user); 
            localStorage.setItem('user', userToLocal);
            location.href = "index.html";
        } else {
            errorElement.style.display = 'block';
            errorElement.innerHTML = "No tiene saldo suficiente.";
            amount.value = undefined;
        }
    } else {
        errorElement.style.display = 'block';
        errorElement.innerHTML = "Por favor, completar campos obligatorios."
    }
   
}

backButtonElement.addEventListener('click', () => location.href = "index.html");
formElement.addEventListener('submit', (e) => saveDeposit(e));