const fs = require('fs').promises;

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async createCart() {
        const carts = await this.getAll();
        const newCart = { id: Date.now().toString(), products: [] };
        carts.push(newCart);
        await this.saveCarts(carts);
        return newCart;
    }

    async getAll() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getCartById(id) {
        const carts = await this.getAll();
        return carts.find(cart => cart.id === id);
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getAll();
        const cart = carts.find(cart => cart.id === cartId);

        if (cart) {
            const product = cart.products.find(p => p.product === productId);
            if (product) {
                product.quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
            await this.saveCarts(carts);
            return cart;
        } else {
            throw new Error("Carrito no encontrado");
        }
    }

    async saveCarts(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    }
}

module.exports = CartManager;
