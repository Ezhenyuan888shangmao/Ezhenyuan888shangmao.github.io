var products = [
    {
        "id": 1784346702858,
        "name": "欧美风1*6",
        "category": "gift",
        "price": 65,
        "originalPrice": 70,
        "unit": "箱",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784346638802.jpg",
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784350805162,
        "name": "八面通",
        "category": "gift",
        "price": 65,
        "originalPrice": 70,
        "unit": "提",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784350799963.jpg",
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784351397472,
        "name": "12度小麦原浆",
        "category": "alcohol",
        "price": 60,
        "originalPrice": 70,
        "unit": "箱",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784351361258.jpg",
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784351528191,
        "name": "盲盒",
        "category": "gift",
        "price": 55,
        "originalPrice": 60,
        "unit": "箱",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784351523549.jpg",
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784426291885,
        "name": "52度牛薯地瓜烧",
        "category": "alcohol",
        "price": 240,
        "originalPrice": 300,
        "unit": "箱",
        "minOrder": 2,
        "sales": 0,
        "stock": 100,
        "images": [
            "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784426243153.jpg"
        ],
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784426386248,
        "name": "2+3牛薯粗粮",
        "category": "alcohol",
        "price": 300,
        "originalPrice": 360,
        "unit": "箱",
        "minOrder": 2,
        "sales": 0,
        "stock": 100,
        "images": [
            "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784426318124.jpg"
        ],
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784426424914,
        "name": "42度牛薯地瓜烧",
        "category": "alcohol",
        "price": 200,
        "originalPrice": 240,
        "unit": "箱",
        "minOrder": 2,
        "sales": 0,
        "stock": 100,
        "images": [
            "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784426413142.jpg"
        ],
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784426428347,
        "name": "椒麻鸡",
        "category": "gift",
        "price": 60,
        "originalPrice": 65,
        "unit": "箱",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "images": [
            "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784346296589.jpg"
        ],
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
