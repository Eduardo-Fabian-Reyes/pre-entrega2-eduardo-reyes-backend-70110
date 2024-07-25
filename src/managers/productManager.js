const fs = require('fs').promises;

class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.path = path;
    }

    async addProduct({ title, description, price, img, code, stock }) {
        const products = await this.getProducts();

        if (!title || !description || !price || !img || !code || !stock) {
            throw new Error("Todos los campos son obligatorios");
        }

        if (products.some(item => item.code === code)) {
            throw new Error("El código debe ser único");
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        };

        products.push(newProduct);
        await this.saveProducts(products);
        return newProduct;
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(product => product.id === id);
    }

    async updateProduct(id, updatedProduct) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            await this.saveProducts(products);
            return products[index];
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            const [deletedProduct] = products.splice(index, 1);
            await this.saveProducts(products);
            return deletedProduct;
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    async saveProducts(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;
