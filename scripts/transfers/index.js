let backButtonElement = document.getElementById('back-button');
let formElement = document.getElementById('transfers-form');
let accountElement = document.getElementById('account');
let cbuElement = document.getElementById('cbu');
let amountElement = document.getElementById('amount');
let errorElement = document.getElementById('transfers-error');
let newCbuElement = document.getElementById('add-new-cbu');

errorElement.style.display = 'none';
let localStore = localStorage.getItem('user');
let usersLocalStore = localStorage.getItem('users');

let user = JSON.parse(localStore);
let users = JSON.parse(usersLocalStore);

accountElement.value = `${user.cbu}`;

let option = document.createElement('option');
option.value = '';
option.innerHTML = 'Seleccionar CBU';
cbuElement.appendChild(option);

users.forEach(us => {
    us.saved.forEach(u => {
        let option = document.createElement('option');
        option.value = u.cbu;
        option.innerHTML = u.fullName;
        cbuElement.appendChild(option);
    })
});

function saveTransfers(e) {
    e.preventDefault();

    errorElement.style.display = 'none';

    let localStore = localStorage.getItem('user');
    let user = JSON.parse(localStore);

    let cbu = cbuElement.value;
    let amount = parseInt(amountElement.value);

    if (cbu && amount) {
        if (amount < parseInt(user.balance)) {
            let userObj = { ...user, balance: parseInt(user.balance - amount) };
            let userToLocal = JSON.stringify(userObj); 

            let updatedUsers = users.filter(userFromLocal => 
            userFromLocal.cbu !== user.cbu);
            updatedUsers.push(userObj);

            let tranferedUser;

            let secondUpdate = [];

            updatedUsers.forEach(el => {
                if (el.cbu === cbu) {
                    tranferedUser = { ...el, balance: parseInt(el.balance + amount) };
                } else {
                    secondUpdate.push(el);
                }
            })

            secondUpdate.push(tranferedUser);
    
            let updatedUsersLocal = JSON.stringify(secondUpdate);
    
            localStorage.setItem('user', userToLocal);
            localStorage.setItem('users', updatedUsersLocal);

            location.href = "./../index.html";
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

backButtonElement.addEventListener('click', () => location.href = "./../index.html");
formElement.addEventListener('submit', (e) => saveTransfers(e));
newCbuElement.addEventListener('click', () => location.href = "savedAccounts.html");