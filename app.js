
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Samsung smart',
        precio: 50000,
        imagen: 'assets/tele-1.png'
    },
    {
        id: 2,
        nombre: 'Phillips',
        precio: 47000,
        imagen: 'assets/tele-2.png'
    },
    {
        id: 3,
        nombre: 'Hitachi',
        precio: 46000,
        imagen: 'assets/tele-3.png'
    },
    {
        id: 4,
        nombre: 'SONYA',
        precio: 30000,
        imagen: 'assets/tele-4.png'
    },
    {
        id: 5,
        nombre: 'Hitachi',
        precio: 46000,
        imagen: 'assets/tele-3.png'
    },
    {
        id: 6,
        nombre: 'SONYA',
        precio: 30000,
        imagen: 'assets/tele-4.png'
    }

];


const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonComprar = document.querySelector('#boton-comprar');
let carrito = [];

//mi local storage para que los productos no se eliminen
if (localStorage.getItem("carrito")) {

    carrito = JSON.parse(localStorage.getItem("carrito"))

    renderizarCarrito()
}


function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-md-4');
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-success');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });

    
}


function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
 
    renderizarCarrito();

}


function renderizarCarrito() {
 
    DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
         
            return itemBaseDatos.id === parseInt(item);
        });
       const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
          const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
 
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });

    DOMtotal.textContent = calcularTotal();


    //mi local storage para que los productos no se eliminen
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function borrarItemCarrito(evento) {

    const id = evento.target.dataset.item;

    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });

    renderizarCarrito();
}

function calcularTotal() {

    return carrito.reduce((total, item) => {

        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
 
        return total + miItem[0].precio;
    }, 0).toFixed(2);

}


function vaciarCarrito() {

    swal({
        title: "Estas seguro?",
        text: "Vas a eliminar todos los productos del carrito",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {

            carrito = [];
 
            renderizarCarrito();

          swal("Los productos del carrito han sido eliminados", {
            icon: "success",
          });
        } else {
          swal("Genial! continue con su compra!");
        }
      });


}

function comprarCarrito() {

    
    
    // localStorage.setItem("id-producto", carrito);

    swal("Listo!", "Tu compra fue realizada con exito!", "success");
}


// let baseENJ = JSON.stringify(baseDeDatos);


// localStorage.setItem("baseDeDatos", baseENJ)


DOMbotonComprar.addEventListener('click', comprarCarrito);

DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// fetch

// const lista = document.querySelector("#lista")


//   fetch ("/data.json")
  
//   .then ((res)=> res.json())
//   .then ((data)=>{

//     data.forEach((producto) => {

//         const li = document.createElement("li")

//         li.innerHTML=`
        
//         <h4>${producto.id}</h4>
//         <p>${producto.nombre}</p>
//         <p>${producto.precio}</p>
        
//         `

//         lista.append(li)
//     })
//   } )


renderizarProductos();
renderizarCarrito();
