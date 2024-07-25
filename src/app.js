const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const port = 8080;
app.listen(port, () => {
    console.log('En vivo y en directo desde el puerto 8080 para toda la majestuoseichon');
});

// app.get("/products/:id", (req, res) => {
//     let id = req.params.id;
//     let productId = product.find( product => === id);

//     if(productId) {
//         return res.send(productId);
//     } else {
//         return res.send("Lo sentimos, producto no encontrado");
//     }
// });
