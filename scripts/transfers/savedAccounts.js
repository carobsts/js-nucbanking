let backButtonElement = document.getElementById('back-button');
let formElement = document.getElementById('saved-account__form');
let cbuElement = document.getElementById('cbu');
let errorElement = document.getElementById('saved-accounts-error');
let submitButtonElement = document.getElementById('saved-button');
let newCbuElement = document.getElementById('new-cbu__data');
let fullnameContentElement = document.getElementById('fullname__content');
let fullnameElement = document.getElementById('fullName');

errorElement.style.display = 'none';
newCbuElement.style.display = 'none';
fullnameContentElement.style.display = 'none';
submitButtonElement.textContent = 'Buscar';

let localStoreForUser = localStorage.getItem('user');
let localStoreForUsers = localStorage.getItem('users');

let user = JSON.parse(localStoreForUser);
let users = JSON.parse(localStoreForUsers);

function saveAccount(e) {
    e.preventDefault();

    let fullName = fullnameElement.value;
    let cbu = cbuElement.value;

    if (fullName && cbu) {
        let userObj = { ...user, saved: [...user.saved, { cbu, fullName } ]};

        let userToLocal = JSON.stringify(userObj); 

        let updatedUsers = users.filter(userFromLocal => 
        userFromLocal.cbu !== user.cbu);

        updatedUsers.push(userObj);

        let updatedUsersLocal = JSON.stringify(updatedUsers);

        localStorage.setItem('user', userToLocal);
        localStorage.setItem('users', updatedUsersLocal);

        location.href = "./index.html";
    } else {
        errorElement.style.display = 'block';
        errorElement.innerHTML = "Complete los campos obligatorios."
    }
}

function getAccount(e) {
    e.preventDefault();

    errorElement.style.display = 'none';

    let cbu = cbuElement.value;

    let match = false;

    users.forEach( account => {
        if (account.cbu === cbu) {
            fullnameContentElement.style.display = 'flex';
            newCbuElement.style.display = 'flex';
            let div = document.createElement('div');
            div.innerHTML = `
                <p> 
                    Propietario: 
                    <strong> 
                        ${account.name} ${account.lastname}
                    </strong>
                </p>
            `;
            newCbuElement.appendChild(div);
            match = true;
            return;
        }
    });

    if (!match) {
        errorElement.style.display = 'block';
        errorElement.innerHTML = "CBU no existente."
    } else {
        formElement.removeEventListener('submit', getAccount);
        formElement.addEventListener('submit', (e) => saveAccount(e));
        submitButtonElement.textContent = 'Guardar';
    }
}

backButtonElement.addEventListener('click', () => location.href = "./../index.html");
formElement.addEventListener('submit', (e) => getAccount(e));