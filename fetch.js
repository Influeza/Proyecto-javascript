const tabla = document.querySelector('#lista-productos tbody');

function cargarProductos() {
    fetch('productos.json')
        .then(respuesta => respuesta.json())
        .then(productos => {
            productos.forEach(producto => {
                const row = document.createElement('tr');
                row.innerHTML += `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.fecha}</td>
                `;
                tabla.appendChild(row);
            });
        })
}

cargarProductos();
