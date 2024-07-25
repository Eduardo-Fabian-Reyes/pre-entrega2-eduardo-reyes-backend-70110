const express = require('express');
const router = express.Router();
const CartManager = require('../managers/cartManager');
const cartManager = new CartManager('./src/data/carts.json');

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getAll();
        res.json(carts);
    } catch (error) {
        res.status(500).send('Error al obtener los carritos');
    }
});

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).send('Error al crear el carrito');
    }
});

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    if(updatedCart) {
        res.json(updatedCart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

module.exports = router;
