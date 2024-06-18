// frontend/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const carrito = [];

    const agregarAlCarrito = (producto) => {
        carrito.push(producto);
        actualizarCarrito();
    };

    const actualizarCarrito = () => {
        const carritoContainer = document.querySelector('#carrito');
        carritoContainer.innerHTML = '';
        carrito.forEach((producto, index) => {
            const item = document.createElement('div');
            item.textContent = `${producto.nombre} - ${producto.precio}`;
            carritoContainer.appendChild(item);
        });
    };

    const cargarProductos = async () => {
        const response = await fetch('http://localhost:3000/productos');
        const productos = await response.json();

        const catalogoContainer = document.querySelector('#contenido');
        productos.forEach(producto => {
            const item = document.createElement('div');
            item.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}</p>
                <button class="btn-agregar" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al Carrito</button>
            `;
            catalogoContainer.appendChild(item);
        });

        document.querySelectorAll('.btn-agregar').forEach(button => {
            button.addEventListener('click', () => {
                const producto = {
                    nombre: button.dataset.nombre,
                    precio: button.dataset.precio
                };
                agregarAlCarrito(producto);
            });
        });
    };

    cargarProductos();
});
