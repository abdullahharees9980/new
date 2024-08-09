const prices = {
    apple: 3,
    banana: 1,
    orange: 2,
    grapes: 4,
    mango: 5,
    pear: 3,
    tomato: 2,
    potato: 1,
    carrot: 2,
    broccoli: 3,
    spinach: 2,
    cucumber: 1,
    milk: 1.5,
    cheese: 4,
    butter: 3,
    yogurt: 2,
    cream: 2.5,
    icecream: 3,
    chicken: 6,
    beef: 8,
    fish: 7,
    shrimp: 10,
    flour: 1,
    sugar: 0.8,
    salt: 0.5,
    oil: 5,
    bakingpowder: 2,
    vanilla: 3
};

const cart = [];

function addToCart() {
    const formElements = document.getElementById('orderForm').elements;
    for (let element of formElements) {
        if (element.type === 'number' && element.value > 0) {
            const product = element.name;
            const quantity = parseFloat(element.value);
            const price = prices[product] * quantity;
            cart.push({ product, quantity, price });
        }
    }
    updateCartTable();
}

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 1);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

    document.getElementById('delivery-message').innerText = `Thank you for your order! Your delivery is scheduled for ${formattedDate}.`;
    document.getElementById('delivery-message').style.display = 'block';
});

function updateCartTable() {
    const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    cartTable.innerHTML = '';
    let totalPrice = 0;
    for (let item of cart) {
        const row = cartTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = item.product;
        cell2.innerHTML = item.quantity;
        cell3.innerHTML = item.price.toFixed(2) + ' USD';
        totalPrice += item.price;
    }
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
}

function addToFavourite() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    localStorage.setItem('favouriteOrder', JSON.stringify(formObject));
    alert('Order added to favourites!');
}

function applyFavourite() {
    const favouriteOrder = localStorage.getItem('favouriteOrder');
    if (favouriteOrder) {
        const orderData = JSON.parse(favouriteOrder);
        

        for (const key in orderData) {
            if (orderData.hasOwnProperty(key)) {
                const inputElement = document.getElementById(key);
                if (inputElement) {
                    inputElement.value = orderData[key];
                }
            }
        }

       
        cart.length = 0; 
        for (const key in orderData) {
            if (orderData.hasOwnProperty(key) && orderData[key] > 0) {
                const product = key;
                const quantity = parseFloat(orderData[key]);
                const price = prices[product] * quantity;
                cart.push({ product, quantity, price });
            }
        }
        updateCartTable();
        
        alert('Favourite order applied!');
    } else {
        alert('No favourite order found!');
    }
}

function buyNow() {
    const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    const rows = cartTable.getElementsByTagName('tr');
    let cartItems = [];

    for (let row of rows) {
        let product = row.cells[0].innerText;
        let quantity = row.cells[1].innerText;
        let price = row.cells[2].innerText;

        cartItems.push({ product, quantity, price });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.location.href = 'checkout.html';
}


document.addEventListener('DOMContentLoaded', function () {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (cartItems && cartItems.length > 0) {
        const checkoutSummary = document.createElement('section');
        checkoutSummary.className = 'section';

        const summaryTable = document.createElement('table');
        summaryTable.className = 'section';
        summaryTable.innerHTML = `
            <thead>
                <tr>
                    <th class="section">Product</th>
                    <th class="section">Quantity</th>
                    <th class="section">Price</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = summaryTable.getElementsByTagName('tbody')[0];

        cartItems.forEach(item => {
            const row = tbody.insertRow();
            row.insertCell(0).innerText = item.product;
            row.insertCell(1).innerText = item.quantity;
            row.insertCell(2).innerText = item.price;
        });

        checkoutSummary.appendChild(summaryTable);
        document.body.insertBefore(checkoutSummary, document.querySelector('.checkout-form'));
    }
});

