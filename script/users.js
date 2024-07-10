const homeB = document.getElementById('homeB');

const tools = `
    <h2>User :</h2>
    <div>
        <input type="text" id="name" name="name" placeholder="nombre">
        <input type="password" id="pswd" name="pswd" placeholder="contraseña">
    </div>
    <div>
        <button id="regisUserB" type="button">REGISTRAR</button>
        <button id="loginUserB" type="button">LOG IN</button>
        <button id="logoutUserB" type="button">LOG OUT</button>
        <button id="removeUserB" type="button">BORRAR</button>
    </div>
    <hr>
        <p>Tienes un usuario de prueba:</p>
        <p><b>Usuario :</b> probe</p>
        <p><b>Contraseña :</b>1234</p>
    <hr>
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
            data.errors?
                content.innerHTML=`${data.errors.map(err =>`<p>${err.msg}</p>`).join('')}`:
			    content.innerHTML=`<p>Hola ${data.name} , recuerda loguearte!</p>`
		})
}

function loginUser(user){
    let sesTok = localStorage.getItem('sesTok');
    if(sesTok == undefined) sesTok = null;

    fetch(ROOT_URL + '/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({...user,sesTok}),
	})
		.then((res) =>res.json())
		.then((data) => {
            if(data.sestok != undefined)
                localStorage.setItem('sesTok', data.sestok);   

			data.errors?
                content.innerHTML=`${data.errors.map(err =>`<p>${err.msg}</p>`).join('')}`:
			    content.innerHTML=`<p>${data.message}</p>`
		})
}

function logoutUser(){
    const sesTok = localStorage.getItem('sesTok');
    fetch(ROOT_URL + '/api/users/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify({sesTok}),
	})
		.then((res) =>res.json())
		.then((data) => {
            if(data.message === 'Good bye!')localStorage.removeItem('sesTok');

			data.errors?
                content.innerHTML=`${data.errors.map(err =>`<p>${err.msg}</p>`).join('')}`:
                content.innerHTML=`<p>${data.message}</p>`
		})
}

function removeUser(user){
    const sesTok = localStorage.getItem('sesTok');
    fetch(ROOT_URL + '/api/users/remove', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({...user,sesTok}),
	})
		.then((res) =>res.json())
		.then((data) => {
			data.errors?
                content.innerHTML=`${data.errors.map(err =>`<p>${err.msg}</p>`).join('')}`:
			    content.innerHTML=`<p>${data.message}</p>`
		})
}

homeB.addEventListener('click',()=>renderUsr());


function renderUsr(){
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
    
    userPswd.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("loginUserB").click();
        }
      });
}
