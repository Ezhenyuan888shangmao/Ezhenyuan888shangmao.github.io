var products = [
    {
        "id": 1,
        "name": "农夫山泉矿泉水",
        "category": "gift",
        "price": 12,
        "originalPrice": 15,
        "unit": "箱",
        "minOrder": 10,
        "sales": 1250,
        "stock": 500,
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mineral%20water%20bottles%20pack%20product%20photo%20white%20background&image_size=square",
        "description": "优质天然矿泉水，源自长白山天然水源",
        "specifications": [
            {"name": "规格", "value": "550ml*24瓶/箱"},
            {"name": "保质期", "value": "24个月"},
            {"name": "产地", "value": "浙江杭州"}
        ]
    },
    {
        "id": 2,
        "name": "可口可乐饮料",
        "category": "gift",
        "price": 45,
        "originalPrice": 55,
        "unit": "箱",
        "minOrder": 5,
        "sales": 890,
        "stock": 300,
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coca%20cola%20cans%20pack%20product%20photo%20white%20background&image_size=square",
        "description": "经典碳酸饮料，畅爽口感",
        "specifications": [
            {"name": "规格", "value": "330ml*24罐/箱"},
            {"name": "保质期", "value": "12个月"},
            {"name": "产地", "value": "上海"}
        ]
    },
    {
        "id": 3,
        "name": "康师傅方便面",
        "category": "gift",
        "price": 32,
        "originalPrice": 40,
        "unit": "箱",
        "minOrder": 10,
        "sales": 4500,
        "stock": 1000,
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=instant%20noodles%20box%20product%20photo%20white%20background&image_size=square",
        "description": "经典红烧牛肉面，方便快捷",
        "specifications": [
            {"name": "规格", "value": "140g*24袋/箱"},
            {"name": "保质期", "value": "18个月"},
            {"name": "产地", "value": "天津"}
        ]
    },
    {
        "id": 4,
        "name": "金龙鱼食用油",
        "category": "gift",
        "price": 68,
        "originalPrice": 85,
        "unit": "桶",
        "minOrder": 5,
        "sales": 890,
        "stock": 200,
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cooking%20oil%20bottle%20product%20photo%20white%20background&image_size=square",
        "description": "非转基因大豆油，健康烹饪",
        "specifications": [
            {"name": "规格", "value": "5L/桶"},
            {"name": "保质期", "value": "18个月"},
            {"name": "产地", "value": "山东"}
        ]
    },
    {
        "id": 5,
        "name": "月饼",
        "category": "festival",
        "price": 12,
        "originalPrice": 15,
        "unit": "箱",
        "minOrder": 10,
        "sales": 0,
        "stock": 100,
        "image": "https://raw.githubusercontent.com/Ezhenyuan888shangmao/Ezhenyuan888shangmao.github.io/main/images/1784196956879_photomode_21032025_230026.png",
        "description": "",
        "specifications": [
            {"name": "规格", "value": "-"}
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
