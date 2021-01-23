let backButtonElement = document.getElementById('back-button');
let cardContainer = document.getElementById('container');

let localStoreToUser = localStorage.getItem('user');
let localStoreToUsers = localStorage.getItem('users');
let user = JSON.parse(localStoreToUser);
let users = JSON.parse(localStoreToUsers);

function unsubscribeService(serviceName) {
    let filteredServices = user.services.filter(service => service.name !== serviceName);
    let newUser = { ...user, services: filteredServices }
    let parseUser = JSON.stringify(newUser);
    localStorage.setItem('user', parseUser);

    let filteredUsers = users.filter(us => us.cbu !== user.cbu);
    filteredUsers.push(newUser);
    let parseUsers = JSON.stringify(filteredUsers);
    localStorage.setItem('users', parseUsers);

    location.href = "index.html";
}

function displayCards() {
    user.services.forEach(service => {
        if (service.pay) {

            let date = new Date(service.date);
            let year = date.getFullYear();
            let day = date.getDate();
            let month = date.getMonth()+1;

            let div = document.createElement('div');
            div.classList = 'card__content';
            div.innerHTML = `
                <label> Servicio: </label>
                <h4> ${service.name} </h4>
                <p> $ ${service.amount} </p>
                <label> Vencimiento: ${day}/${month}/${year} </label>
                <button value=${service.name} onclick="unsubscribeService(value)"> Desvincular </button>
            `;
            cardContainer.appendChild(div);
        }
    })
}

backButtonElement.addEventListener('click', () => location.href = "index.html");
document.addEventListener('DOMContentLoaded', displayCards);