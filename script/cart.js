const listB = document.getElementById('listB');

const list = () =>`
    <h2>Cart List :</h2>
`;

function cartList(){
    const sesTok = localStorage.getItem('sesTok');

    fetch(ROOT_URL + '/api/dashb/list', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify({sesTok}),
	})
		.then((res) =>res.json())
		.then((data) => {
            console.log(data)
            if(!data.products.length){
                content.innerHTML = '<h3>Vacio...</h3>';
                return;
            } 
            content.innerHTML = `
                <div id="cartListProds"></div>
                <div id="cartListTotal"></div>
                <button id="dejSelectB">LIMPIAR TODO</button>    
            `;
            const cartListProds = document.getElementById('cartListProds');
            const cartListTotal = document.getElementById('cartListTotal');
            const dejSelectB = document.getElementById('dejSelectB');

            data.products.forEach(product => {
                let addProduct = document.createElement('p');
                addProduct.innerHTML =`
                        <span>${product.pname}</span>
                        <span>${product.pricep} €</span>
                `;
                cartListProds.appendChild(addProduct);
            });

            cartListTotal.innerHTML=`<p><b>TOTAL :</b> ${data.total}</p>`;

            dejSelectB.addEventListener('click',()=>{
                const pordClearAll = true;
                fetch(ROOT_URL + '/api/dashb/list', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({pordClearAll,sesTok}),
                })
                    .then((res) =>res.json())
                    .then((data) => {
                        content.innerHTML = '<h3>Vacio...</h3>';
                        alert(data.message);
                    })
            })
		})
}



listB.addEventListener('click',()=>{
    const sesTok = localStorage.getItem('sesTok');
    toolBar.innerHTML = '';
    content.innerHTML = '';

    if(sesTok){
        toolBar.innerHTML = list();
        cartList();
    }
});
