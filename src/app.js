import express from 'express';
import { engine } from 'express-handlebars';
import viewsRouter from "./routes/views.router.js";
import { Server } from 'socket.io';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const app = express();

app.use(express.json());
app.use(express.static("./src/public"));

const hbs = engine();
app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use("/", viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const port = 8080;
const httpServer = app.listen(port, () => {
    console.log('En vivo y en directo desde el puerto 8080 para toda la majestuoseichon');
});

const io = new Server(httpServer);

//aca estaba la lista de compradores recientes de la tienda

const usuarios = [
    {id: 1, nombre: "Joey", apellido: "Ramone",},
    {id: 2, nombre: "Dee Dee", apellido: "Ramone",},
    {id: 3, nombre: "Johnny", apellido: "Ramone",},
    {id: 4, nombre: "Tommy", apellido: "Ramone",},
    {id: 5, nombre: "Ringo", apellido: "Starr",},
];

const arrayProductos = [
    {id: 1, title: "Glow On", description: "Album Musical de Turnstile", price: "1550"},
    {id: 3, title: "Fresh Fruit for Rotting Vegetables", description: "Álbum de estudio de Dead Kennedys", price: "1899"},
    {id: 4, title: "Dookie", description: "Álbum de estudio de Green Day", price: "1999"},
    {id: 5, title: "Ramones", description: "Primer Album de los Ramones", price: "1299"},
    {id: 6, title: "Bad Religion", description: "Álbum de estudio de Bad Religion", price: "1899"},
];

io.on("connection", (socket) => {
    console.log("Se ha conectado un Usuario");

    socket.emit('productos', arrayProductos);

    socket.on('nuevoProducto', (nuevoProducto) => {
        arrayProductos.push(nuevoProducto);
        io.emit('productos', arrayProductos);
    });

    socket.on('eliminarProducto', (productId) => {
        const index = arrayProductos.findIndex(p => p.id === productId);
        if (index !== -1){
            arrayProductos.splice(index, 1);
            io.emit('productos', arrayProductos);
        };
    })

    socket.on("mensaje", (data) => {
        console.log(data);
    });

    socket.emit("bienvenida", "Bienvenido, en que te ayudamos?");
    socket.emit("usuarios", usuarios);
});
