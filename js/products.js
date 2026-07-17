var products = [
    {
        "id": 1784279311493,
        "name": "欧美风1*8",
        "category": "gift",
        "price": 85,
        "originalPrice": 90,
        "unit": "提",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784279293970_545c0d2b44fbbc9b75245cc68766c9ba.jpg",
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784279789283,
        "name": "12度小麦原浆",
        "category": "alcohol",
        "price": 50,
        "originalPrice": 60,
        "unit": "箱",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784279783930_f317522242e18cce8bc1d23655baad31.jpg",
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784281793204,
        "name": "八面通",
        "category": "gift",
        "price": 60,
        "originalPrice": 65,
        "unit": "提",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784281786783_8caf22e0fb06a8d2e05a68605a2347c0.jpg",
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784281907533,
        "name": "金星0糖干啤",
        "category": "alcohol",
        "price": 70,
        "originalPrice": 80,
        "unit": "箱",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784281880700_cd8a4ba61e3e63db82289f41b61fbaf3.jpg",
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784282574866,
        "name": "椒麻鸡",
        "category": "gift",
        "price": 60,
        "originalPrice": 65,
        "unit": "提",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784264388743_微信图片_20260717092004_459_44.jpg",
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784282593664,
        "name": "盲盒",
        "category": "gift",
        "price": 55,
        "originalPrice": 55,
        "unit": "提",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784279705709_f42cffeeb39d2eae0a3533b91ac64180.jpg",
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784282607545,
        "name": "欧美风1*6",
        "category": "gift",
        "price": 60,
        "originalPrice": 65,
        "unit": "提",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784279406570_ae61c21a1daf047a1ca2117b9d66791d.jpg",
        "description": "",
        "specifications": [
            {
                "name": "规格",
                "value": "-"
            }
        ]
    },
    {
        "id": 1784282617537,
        "name": "盛宴1*12",
        "category": "gift",
        "price": 85,
        "originalPrice": 90,
        "unit": "提",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784279627611_909f479a2694b079e5457f6a175a0296.jpg",
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
