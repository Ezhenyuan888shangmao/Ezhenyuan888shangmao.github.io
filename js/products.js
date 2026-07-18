var products = [
    {
        "id": 1784346301334,
        "name": "椒麻鸡",
        "category": "gift",
        "price": 60,
        "originalPrice": 65,
        "unit": "箱",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784346296589.jpg",
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    }
];

function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
}

const CART_KEY = 'wholesale_cart';

function getCart() {
    try {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId, quantity) {
    const cart = getCart();
    const product = getProductById(productId);
    if (!product) return false;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            minOrder: product.minOrder,
            image: product.image,
            quantity: quantity
        });
    }
    saveCart(cart);
    return true;
}

function updateCartItem(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart(cart);
        }
    }
}

function removeFromCart(productId) {
    const cart = getCart();
    const filteredCart = cart.filter(item => item.id !== productId);
    saveCart(filteredCart);
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItems() {
    const cart = getCart();
    return cart;
}
