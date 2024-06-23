
const searchB = document.getElementById('searchB');

const search = (user,status,counter) =>`
    <h2>Search :</h2>
    <h3>Usuario ${status}: ${user}</h3>
    <h3>Contador : ${counter}</h3>
    <div>
        <input type="text" id="prodSearch" name="prodSearch" placeholder="producto" required>
    </div>
    <div>
        <button id="productSearchB">BUSCAR</button>
    </div>
`;

function infoUser(){
    const sesTok = localStorage.getItem('sesTok');
    const counterToken = localStorage.getItem('counterToken');

    fetch(ROOT_URL + '/api/dashb', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify({sesTok,counterToken}),
	})
		.then((res) =>res.json())
		.then((data) => {
            if(!data.userName)
                toolBar.innerHTML = '<h2>Debes loguearte a tu sessión!</h2>'
            else if (data.message)
                toolBar.innerHTML = `<h2>ERROR : ${data.message}</h2>`
            else{
                localStorage.setItem('counterToken', data.counterToken); 
                renderSearch(data);    
            }
		})
}

function searchProduct(product){
    toolBar.innerHTML = '<h2>Espere un momento por favor...</h2>';

    const sesTok = localStorage.getItem('sesTok');
    const counterToken = localStorage.getItem('counterToken');

    fetch(ROOT_URL + '/api/dashb/search', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify({product,sesTok,counterToken}),
	})
		.then((res) =>res.json())
		.then((data) => {   
            if (data.message)
                toolBar.innerHTML = `<h2>ERROR : ${data.message}</h2>`
            else{
                localStorage.setItem('counterToken', data.counterToken);
                infoUser();
                content.innerHTML = `
                    <h3>Resultados :</h3>
                    <p>Aldi : ${data.Aldi}</p>
                    <p>Caprabo : ${data.Caprabo}</p>
                    <p>Carrefour : ${data.Carrefour}</p>
                    <p>Condis : ${data.Condis}</p>
                    <p>Dia : ${data.Dia}</p>
                    <p>ElCorteIngles : ${data.ElCorteIngles}</p>
                    <p>Eroskie : ${data.Eroskie}</p>
                    <p>LaSirena : ${data.LaSirena}</p>
                    <p>Lidel : ${data.Lidel}</p>
                    <button id="productResultB">PRECIOS</button>
                `;
                const productResultB = document.getElementById('productResultB');
                productResultB.addEventListener('click',()=>searchResult(product));
            }

		})
}
function searchResult(product){
    const sesTok = localStorage.getItem('sesTok');
    fetch(ROOT_URL + '/api/dashb/result', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify({product,sesTok}),
	})
		.then((res) =>res.json())
		.then((data) => {   
            toolBar.innerHTML = `<h2>Precios ordenados - ${product}</h2>`;
            content.innerHTML = `
                <div id='cheepest'>
                    
                </div>                
                <div id='cheepers'>
                    <h3>Los más baratos :</h3>
                </div>
                <div id='sortedAll'>
                    <h3>General :</h3>    
                </div>
            `;
            const cheepest = document.getElementById('cheepest');
            const cheepersP = document.getElementById('cheepers');
            const sortedAll = document.getElementById('sortedAll');


            if(data.cheepest.length > 0) cheepest.innerHTML =`
                <h3>-MÁS BARATO-</h3>
                <p>Super : ${data.cheepest[0].superm}</p>
                <p>Producto : ${data.cheepest[0].pname}</p>
                <p>Precio venta :${data.cheepest[0].pricep}€</p>
                <p>Precio/Unidad :${data.cheepest[0].priceu}</p>
                <button class="productSelectB" value="${data.cheepest[0]._id}">SELECCIONAR</button> 
            `;

            for( const [key,value] of Object.entries(data.cheepers)){
                if(value.length > 0){
                    let addProduct = document.createElement('div');
                    addProduct.innerHTML =`
                        <div class='cheeper'>
                            <p><b>${key}</b></p>
                            <p>Producto : ${value[0].pname}</p>
                            <p>Precio venta :${value[0].pricep}€</p>
                            <p>Precio/Unidad :${value[0].unit}</p>
                            <button class="productSelectB" value="${value[0]._id}">SELECCIONAR</button>
                        </div>
                    `
                    cheepersP.appendChild(addProduct);
                } 
                
            }
            //For each super
            for( const [key,value] of Object.entries(data.sort)){
                if(value.length > 0){
                    let addSuper = document.createElement('div');
                    addSuper.innerHTML =`
                        <div class='supers'>
                            <p><b>${key}</b></p>
                        </div>
                    `;
                    //For each product of than super
                    value.forEach(prod => {
                        let addProd = document.createElement('div');
                        addProd.innerHTML=`
                            <p>Producto : ${prod.pname}</p>
                            <p>Precio venta :${prod.pricep}€</p>
                            <p>Precio/Unidad :${prod.unit}</p>
                            <button class="productSelectB" value="${prod._id}">SELECCIONAR</button>
                        `;
                        addSuper.appendChild(addProd);
                    });
                    sortedAll.appendChild(addSuper);
                } 
                
            }

            let productSelectB = document.querySelectorAll('.productSelectB');

            for(let pSB in productSelectB){
                if(pSB<productSelectB.length){
                    productSelectB[pSB].addEventListener("click", () =>{
                        addToCart(productSelectB[pSB].value);
                });
                }
            }

		})
}

function addToCart (prodId){
    const sesTok = localStorage.getItem('sesTok');
    fetch(ROOT_URL + '/api/dashb/select', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify({prodId,sesTok}),
	})
		.then((res) =>res.json())
		.then((data) => {
            alert(data.message)
		})

}

searchB.addEventListener('click',()=>{
    content.innerHTML = '';
    infoUser();
});

function renderSearch(data){
    const name=data.userName;
    const status=data.userStatus;
    const counter=data.serachCounter;

    toolBar.innerHTML = search(name,status,counter);
    
    const prodSearch = document.getElementById('prodSearch');
    
    const productSearchB = document.getElementById('productSearchB');

    productSearchB.addEventListener('click',()=>{
        content.innerHTML = '';
        searchProduct(prodSearch.value);
    })
}