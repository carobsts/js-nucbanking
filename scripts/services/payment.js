let backButtonElement = document.getElementById('back-button');
let cardContainer = document.getElementById('container');
let errorElement = document.getElementById('payment-error');

let localStoreToUser = localStorage.getItem('user');
let localStoreToUsers = localStorage.getItem('users');
let user = JSON.parse(localStoreToUser);
let users = JSON.parse(localStoreToUsers);

function payService(serviceName) {
    user.services.forEach(service => {
        if (service.name === serviceName) {
            if (user.balance >= service.amount) {
                let today = new Date();
                let updateService = { ...service, pay: true, payDate: today }
                let newServicesList = user.services.filter( serv => serv.name !== serviceName);
                newServicesList.push(updateService);
                user = { ...user, services: newServicesList, balance: parseInt(user.balance - service.amount) }
                let parseUser = JSON.stringify(user);
                localStorage.setItem('user', parseUser);

                let filteredUsers = users.filter(us => us.cbu !== user.cbu);
                filteredUsers.push(user);
                let parseUsers = JSON.stringify(filteredUsers);
                localStorage.setItem('users', parseUsers);
            }
        }
    })

    location.href = "index.html";
}

function displayCards() {
    user.services.forEach(service => {
        if (!service.pay) {
            let today = new Date();
            let dateFromObject = new Date(service.date);
            let data = today < dateFromObject ? 'Al día' : 'Vencido';

            let year = dateFromObject.getFullYear();
            let day = dateFromObject.getDate();
            let month = dateFromObject.getMonth()+1;

            let div = document.createElement('div');
            div.classList = 'card__content';
            div.innerHTML = `
                <h4> ${service.name} </h4>
                <p> $ ${service.amount} </p>
                <label> Vencimiento: ${day}/${month}/${year} </label>
                <span class="${today < dateFromObject ? 'info' : 'danger'}"> ${data} </span>
                <button value=${service.name} onclick="payService(value)"> Pagar </button>
            `;
            cardContainer.appendChild(div);
        }
    })
}

backButtonElement.addEventListener('click', () => location.href = "index.html");
document.addEventListener('DOMContentLoaded', displayCards);