const ROOT_URL = 'https://super-scraper.onrender.com';

const homeB = document.getElementById('homeB');

const toolBar = document.getElementById('toolBar');
const content = document.getElementById('content');



const tools = `
    <h2>User :</h2>
    <div>
        <input type="text" id="name" name="name" placeholder="nombre">
        <input type="password" id="pswd" name="pswd" placeholder="contraseña">
    </div>
    <div>
        <button id="regisUserB">REGISTRAR</button>
        <button id="loginUserB">LOG IN</button>
        <button id="logoutUserB">LOG OUT</button>
        <button id="removeUserB">BORRAR</button>
    </div>
`;

function regisUser(newUser){
    fetch(ROOT_URL + '/api/users/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newUser),

	})
		.then((res) =>res.json())
		.then((data) => {
            console.log(data);
			content.innerHTML=`<p>${data}</p>`;
		})
}

function loginUser(user){
    fetch(ROOT_URL + '/api/users/login', {
        credentials: 'same-origin',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((res) =>res.json())
		.then((data) => {
            console.log(data);
			content.innerHTML=`<p>${data}</p>`;
		})
}

function logoutUser(){
    fetch(ROOT_URL + '/api/users/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.then((res) =>res.json())
		.then((data) => {
            console.log(data);
			content.innerHTML=`<p>${data}</p>`;
		})
}

function removeUser(user){
    fetch(ROOT_URL + '/api/users/remove', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((res) =>res.json())
		.then((data) => {
            console.log(data);
			content.innerHTML=`<p>${data}</p>`;
		})
}

homeB.addEventListener('click',()=>render());


function render(){
    toolBar.innerHTML = tools;
    content.innerHTML = '';

    const userName = document.getElementById('name');
    const userPswd = document.getElementById('pswd');

    const regisUserB = document.getElementById('regisUserB');
    const loginUserB = document.getElementById('loginUserB');
    const logoutUserB = document.getElementById('logoutUserB');
    const removeUserB = document.getElementById('removeUserB');

    regisUserB.addEventListener('click',()=>{
        const newUser = {
            "name": userName.value,
            "pswd": userPswd.value
        }
        regisUser(newUser);
    })
    loginUserB.addEventListener('click',()=>{
        const user = {
            "name": userName.value,
            "pswd": userPswd.value
        }
        loginUser(user);
    })
    logoutUserB.addEventListener('click', ()=>logoutUser());
    removeUserB.addEventListener('click',()=>{
        const user = {
            "name": userName.value,
            "pswd": userPswd.value
        }
        removeUser(user);
    })
    
}

function renderUser(func,data){

}