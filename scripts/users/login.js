let formElement = document.getElementById('login-form');
let userElement = document.getElementById('user');
let passwordElement = document.getElementById('password');
let loginErrorElement = document.getElementById('login-error');

loginErrorElement.style.display = 'none';

let localStore = localStorage.getItem('users');
let userList = [];

if (localStore) {
    userList = JSON.parse(localStore);
}

function loginUser(e) {
    e.preventDefault();

    loginErrorElement.style.display = 'none';

    let user = userElement.value;
    let password = passwordElement.value;

    console.log(password, user)

    if (user !== '' && password !== '') {

        let match = false;
    
        userList.forEach(userEl => {
            if (userEl.user === user) {
                if (userEl.password == password) {
                    match = true;
                    localStorage.setItem('user', JSON.stringify(userEl));
                    location.href = "../../public/index.html";
                    return;
                }
            }
        })

        if (!match) {
            loginErrorElement.style.display = 'block';
            loginErrorElement.innerHTML = 'Datos incorrectos.'
        }

    } else {
        loginErrorElement.style.display = 'block';
        loginErrorElement.innerHTML = 'Por favor, complete todos los campos.'
    }
}

formElement.addEventListener('submit', (e) => loginUser(e));