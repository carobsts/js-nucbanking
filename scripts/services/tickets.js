let backButtonElement = document.getElementById('back-button');
let cardContainer = document.getElementById('container');

let localStoreToUser = localStorage.getItem('user');
let localStoreToUsers = localStorage.getItem('users');
let user = JSON.parse(localStoreToUser);
let users = JSON.parse(localStoreToUsers);


function displayCards() {
    user.services.forEach(service => {
        if (service.pay) {

            let date = new Date(service.payDate);
            let year = date.getFullYear();
            let day = date.getDate();
            let month = date.getMonth()+1;

            let div = document.createElement('div');
            div.classList = 'card__content';
            div.innerHTML = `
                <h4> ${service.name} </h4>
                <p> $ ${service.amount} </p>
                <label> Fecha de pago: ${day}/${month}/${year} </label>
            `;
            cardContainer.appendChild(div);
        }
    })
}

backButtonElement.addEventListener('click', () => location.href = "index.html");
document.addEventListener('DOMContentLoaded', displayCards);