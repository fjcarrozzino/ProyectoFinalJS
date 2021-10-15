let carts = document.querySelectorAll('.add-cart');

let tortas = [
    {
        name:'Choco Oreo',
        nametag:'chocooreo',
        precio: 2800,
        inCart: 0
    },
    {
        name:'Chocolate y Frutos Secos',
        nametag:'chocolateyfrutossecos',
        precio: 2500,
        inCart: 0
    },
    {
        name:'Cheesecake DDL',
        nametag:'cheesecakeddl',
        precio: 2700,
        inCart: 0
    },
    {
        name:'Chocolate Milk',
        nametag:'chocolatemilk',
        precio: 2700,
        inCart: 0
    },
    {
        name:'Lemon Pie',
        nametag:'lemonpie',
        precio: 1800,
        inCart: 0
    },
    {
        name:'Cheesecake de Cookies',
        nametag:'cheesecakedecookies',
        precio: 2600,
        inCart: 0
    },
    {
        name:'Torta Americana',
        nametag:'tortaamericana',
        precio: 2400,
        inCart: 0
    },
    {
        name:'Apple Crumble',
        nametag:'applecrumble',
        precio: 2000,
        inCart: 0
    },
    {
        name:'Torta de Frutos Rojos',
        nametag:'tortadefrutosrojos',
        precio: 2200,
        inCart: 0
    },
]

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumeros(tortas[i]);
        costoTotal(tortas[i])
    })
}

function guardarCartNumeros() {
    let productNumeros = localStorage.getItem('cartNumeros');

    if(productNumeros) {
        document.querySelector('.nav-link span').textContent = productNumeros
    }
}

function cartNumeros(tortas, action) {
    let productNumeros = localStorage.getItem('cartNumeros');
    productNumeros = parseInt(productNumeros)

    if(action) {
        localStorage.setItem('cartNumeros', productNumeros - 1);
        document.querySelector('.nav-link span').textContent = productNumeros - 1;
    } else if (productNumeros) {
        localStorage.setItem('cartNumeros', productNumeros + 1);
        document.querySelector('.nav-link span').textContent = productNumeros + 1;
    } else {
        localStorage.setItem('cartNumeros', 1);
        document.querySelector('.nav-link span').textContent = 1;
    }
    setItems(tortas);
}

function setItems(tortas) {
    let cartItems = localStorage.getItem('tortasInCart');
    cartItems = JSON.parse(cartItems); 

    if(cartItems != null) { 
        let currentProduct = tortas.nametag;

        if(cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: tortas
            }
        }
        cartItems[currentProduct].inCart += 1;

    } else {
    tortas.inCart = 1; 
    cartItems = {
        [tortas.nametag]: tortas
    }
    }
    localStorage.setItem("tortasInCart", JSON.stringify (cartItems));
}

function costoTotal(tortas, action) {
    let cartCost = localStorage.getItem('costoTotal');
    if(action) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("costoTotal", cartCost - tortas.precio);
    } else if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("costoTotal",cartCost + tortas.precio);
    } else {
        localStorage.setItem("costoTotal", tortas.precio);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("tortasInCart");
    cartItems = JSON.parse(cartItems)
    let tortasContainer = document.querySelector(".productos");
    let cartCost = localStorage.getItem('costoTotal');
    cartCost = parseInt(cartCost)
    console.log(cartItems)

    if(cartItems && tortasContainer) {
        tortasContainer.innerHTML = '';
        Object.values(cartItems).map( (item) => {
            tortasContainer.innerHTML += `
            <div class="producto-cart">
            <ion-icon class="remove" name="close-circle-outline"></ion-icon>
            <img src="../imagenes/${item.nametag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="precio">$${item.precio}</div>
            <div class="cantidad">
                <ion-icon class="decrease" name="arrow-back-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-forward-circle-outline"></ion-icon> </div>
            <div class="total"> $${item.inCart * item.precio} </div>
            `
        });

        tortasContainer.innerHTML += `
        <div class="cart-total">
            <h4 class="cart-total-title">
            TOTAL
            </h4>
            <h4 class="total-numero">
                $${cartCost}
            </h4>
        </div>
        `;

        deleteButtons();
        manejarCantidad();
    }
}

function manejarCantidad() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('tortasInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct)
            if ( cartItems[currentProduct].inCart > 1) {
                 cartItems[currentProduct].inCart -= 1;
                 cartNumeros(cartItems[currentProduct], "decrease");
                 costoTotal(cartItems[currentProduct], "decrease");
                 localStorage.setItem('tortasInCart', JSON.stringify(cartItems));
                 displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems)
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct)

                cartItems[currentProduct].inCart += 1;
                 cartNumeros(cartItems[currentProduct]);
                 costoTotal(cartItems[currentProduct]);
                 localStorage.setItem('tortasInCart', JSON.stringify(cartItems));
                 displayCart();
            
        })
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.remove');
    let productName = '';
    let productNumbers = localStorage.getItem('cartNumeros');
    let cartItems = localStorage.getItem('tortasInCart');
    let cartCost = localStorage.getItem('costoTotal');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.trim().toLocaleLowerCase().replace(/\s/g,'').trim();
            localStorage.setItem('cartNumeros', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('costoTotal', cartCost - ( cartItems[productName].precio * cartItems[productName].inCart));
            console.log(cartItems, "Hola")
            delete cartItems[productName];
            console.log(cartItems, "Cuchau")
            localStorage.setItem('tortasInCart', JSON.stringify(cartItems));

            displayCart();
            guardarCartNumeros();
        })
    }
}

function buyButton () {
    if(alert('Gracias por tu compra!')){
    } else    window.location.reload(); 
    localStorage.clear()
}

guardarCartNumeros();
displayCart();