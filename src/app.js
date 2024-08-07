import express from 'express';
import { engine } from 'express-handlebars';
import viewsRouter from "./routes/views.router.js";
// import { Server, Socket } from 'socket.io';
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
app.listen(port, () => {
    console.log('En vivo y en directo desde el puerto 8080 para toda la majestuoseichon');
});

// const io = new Server(httpServer);

// const usuarios = [

// ];

// io.on("connection", (Socket) => {
//     console.log("Se ha conectado un Usuario");

//     Socket.on("mensaje", (data) => {
//         console.log(data);
//     });

//     Socket.emit("bienvenida", "Bienvenido, en que te ayudamos?");
//     Socket.emit("usuarios", usuarios);
// });
