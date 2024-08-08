// Array to store cart items
let cart = [];

// Function to add item to cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
}

// Function to remove an item or decrease its quantity from the cart
function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        cart[productIndex].quantity -= 1;

        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }

        updateCartDisplay();
    }
}

// Function to update the cart display
function updateCartDisplay() {
    const cartTotalItems = document.querySelector('.cart-total-items');
    const cartTotalPrice = document.querySelector('.cart-total-price');
    const cartItemsContainer = document.querySelector('.cart-items');
    
    // Clear previous items
    cartItemsContainer.innerHTML = '';

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        // Create cart item element with + and - buttons
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            <button class="decrement-btn" data-name="${item.name}">-</button>
            <button class="increment-btn" data-name="${item.name}">+</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalItems.textContent = totalItems;
    cartTotalPrice.textContent = totalPrice.toFixed(2);

    // Add event listeners to increment and decrement buttons
    document.querySelectorAll('.increment-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const product = cart.find(item => item.name === productName);
            addToCart(product);
        });
    });

    document.querySelectorAll('.decrement-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            removeFromCart(productName);
        });
    });
}

// Event listener for "Add to Cart" button
document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
    const product = {
        name: 'Digital Food Scale',
        price: 25.99
    };

    addToCart(product);
});

// Update cart display on page load
document.addEventListener('DOMContentLoaded', updateCartDisplay);
