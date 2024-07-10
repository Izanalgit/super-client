const ROOT_URL = 'https://super-scraper.onrender.com';

const navBar = document.querySelector('nav');
const toolBar = document.getElementById('toolBar');
const content = document.getElementById('content');

localStorage.removeItem('sesTok');
localStorage.removeItem('counterToken');

navBar.style.display='none';
content.innerHTML='<h2>Conectando con el servidor...</h2>'

handsUpAPI();

function handsUpAPI(){
    fetch(ROOT_URL + '/health', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.then((res) =>res.json())
		.then((data) => {
            if(data.message = "server on") {          
                navBar.style.display='block';
                content.innerHTML='<h2>Servidor abierto!</h2>'
                console.log('API RESPONSE : ',data)
            }
		})
}