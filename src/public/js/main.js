console.log("Dime que si, dime que no");

const socket = io();

    socket.emit('mensaje', 'dime que pasa entre tu y yo');
    socket.on('bienvenida', (data) => {
    console.log(data)
});

// la idea de lo comentado a continuacion era hacer una base de compradores que figuren como referencia de compra en el sitio.

// socket.on('usuarios', (arrayUsuarios) => {
//     const listaUsuarios = document.getElementById('lista-usuarios');

//     if (listaUsuarios) {
//         listaUsuarios.innerHTML = '';
//         arrayUsuarios.forEach(usuario => { 
//             listaUsuarios.innerHTML += `<li>${usuario.nombre} - ${usuario.apellido}</li>`
//         });
//     } else {
//         console.error('El elemento de id "lista-usuarios" no se encuentra')
//     }
// });

socket.on('productos', (arrayProductos) => {
    const listaProductos = document.getElementById('lista-products');
    listaProductos.innerHTML = '';
    arrayProductos.forEach(producto => {
        listaProductos.innerHTML += `<li>${producto.title} - ${producto.price} <button class="delete-btn" data-id="${producto.id}">Eliminar</button></li>`;
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            socket.emit('eliminarProducto', productId);
        });
    });
});

const form = document.getElementById('product-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    socket.emit('nuevoProducto', { title, price });
});

