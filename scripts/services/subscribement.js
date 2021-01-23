let serviceNameElement = document.getElementById('service-name');
let amountElement = document.getElementById('amount');
let dateElement = document.getElementById('date');
let backButtonElement = document.getElementById('back-button');
let formElement = document.getElementById('subscribement-form');
let errorElement = document.getElementById('subscribement-error');

errorElement.style.display = 'none';

let localStoreToUser = localStorage.getItem('user');
let localStoreToUsers = localStorage.getItem('users');
let user = JSON.parse(localStoreToUser);
let users = JSON.parse(localStoreToUsers);

function saveService(e) {
    e.preventDefault();

    errorElement.style.display = 'none';

    let name = serviceNameElement.value;
    let amount = parseInt(amountElement.value);
    let date = dateElement.value;

    if (name !== '' && amount && date !== '') {

        let nameMatch = false;

        user.services.forEach(service => {
            if (service.name === name) {
                nameMatch = true;
                return;
            }
        })

        if (nameMatch) {
            errorElement.style.display = 'block';
            errorElement.innerHTML = "Ya existe un servicio con ese nombre."
        } else {
            let updatedUser = { ...user, 
                services: [ ...user.services, { name, amount, date, pay: false }] };
            let parsedUser = JSON.stringify(updatedUser);
            localStorage.setItem('user', parsedUser);

            let filteredUsers = users.filter(us => us.cbu !== user.cbu);
            filteredUsers.push(updatedUser);

            let parseUsers = JSON.stringify(filteredUsers);
            localStorage.setItem('users', parseUsers);

            location.href = "index.html";
        }

    } else {
        errorElement.style.display = 'block';
        errorElement.innerHTML = "Por favor, completar los campos obligatorios."
    }
}

backButtonElement.addEventListener('click', () => location.href = "index.html");
formElement.addEventListener('submit', (e) => saveService(e));