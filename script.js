document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10.99},
        { id: 2, name: 'Product 2', price: 20.99},
        { id: 3, name: 'Product 3', price: 19.99},
        { id: 4, name: 'Product 4', price: 35.00},
        { id: 5, name: 'Product 5', price: 20},
    ];

    let cart = [];
    const  productList = document.getElementById('product-list');
    const  cartItems = document.getElementById('cart-items');
    const  emptyCartMessage = document.getElementById('empty-cart');
    const  cartTotalMessage = document.getElementById('cart-total');
    const  totalPriceDisplay = document.getElementById('total-price');
    const  checkOutBtn = document.getElementById('checkout-btn');
    // const  removeBtn = document.getElementById('remove-btn');

    

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart(); // Render the loaded cart
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart as soon as DOM is ready
loadCartFromLocalStorage();


    products.forEach(product =>{
        const productDiv = document.createElement('div')
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener('click',(e) => {
        if(e.target.tagName === 'BUTTON'){
            // const productId = e.target.dataset.id;
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product)
        }
    });

    function addToCart(product) {
        cart.push(product);
        saveCartToLocalStorage();
        // const existingItem = cart.find(item => item.id === product.id);
        
        // if (existingItem) {
        //     existingItem.quantity += 1;
        // } else {
        //     cart.push({
        //         ...product, 
        //         quantity: 1  // Explicitly setting quantity to 1 for new items
        //     });
        // }
        renderCart();
        
    }

    function renderCart() {
        cartItems.innerText = "";
        let totalPrice = 0

        if (cart.length) {
            emptyCartMessage.classList.add('hidden')
            cartTotalMessage.classList.remove('hidden')
            cart.forEach((item, index) =>{
                totalPrice += item.price;
                const cartItem = document.createElement('div')
                 cartItem.classList.add('cart-item');
                //  cartItem.innerHTML = `
                // //     <div class="cart-item-info">
                // //         <div class="cart-item-name">${item.name} </div>
                       
                // //         <div class="cart-item-price">$${itemPrice.toFixed(2)}</div>
                // //     </div>
                // //      <div class="cart-item-actions">
                // //      </div>`
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button class="remove-btn" data-id="${item.id}">Remove</button>
                `
                cartItems.appendChild(cartItem);
            })
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`
        }else{
            // cartItems.innerText = "Your cart is empty";
            emptyCartMessage.classList.remove('hidden')
            cartTotalMessage.classList.add('hidden')
            totalPriceDisplay.textContent = `$0.00`
        }
        saveCartToLocalStorage();
    }
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const index = cart.findIndex(item => item.id === productId);
            
            if (index !== -1) {
                // Remove the item completely from cart
                cart.splice(index, 1);
                saveCartToLocalStorage();
                renderCart();
            }
        }
    });


    checkOutBtn.addEventListener('click', () =>{
        if(cart.length > 0){

            alert('Checkout Successfully! Total: ' + totalPriceDisplay.textContent);
            cart.length = 0;
            // localStorage.removeItem('cart')
            renderCart()
            totalPriceDisplay.textContent = `$0.00`
        }else{
            alert('Your cart is empty');
        }
    })

    
});