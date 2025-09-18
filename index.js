const API = "https://dragonball-api.com/api";
const FILTRO = Object.freeze({
    characters: "characters",
});

const formularioHeader = document.getElementById('formularioHeader');
const inputSearch = document.getElementById('inputSearch');
const btnSearch = document.getElementById('btnSearch');
const mostrarResultado = document.getElementById('result');
const contenedorProductosPops = document.getElementById('contenedorProductosPops');


// TRAIGO DESDE LA API 4 ELEMENTOS QUE LOS UTILIZO COMO PRODUCTOS POPULARES
async function traerProductosPopulares() {
    const page = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    console.log('random ' + page);

    fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=4`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.items);
            data.items.forEach(personaje => {
                let precio = personaje.ki;
                if(precio == 0){
                    precio = 1
                } else {
                    precio = personaje.ki
                }
                const newContent = `
                <div class="cardProductoPopular">                   
                    <img src="${personaje.image}" alt="">
                    <div>
                        <h3>${personaje.name}</h3>
                        <p>$${precio}</p>
                        <button class="btnAgregarCarrito" 
                            data-nombre="${personaje.name}" 
                            data-precio="${precio || 0}">
                            Add to cart
                        </button>     
                    </div>
                </div>
                `;
                contenedorProductosPops.innerHTML += newContent;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
//-----------------------------------------------------------------------------------------------






// MANEJO LOS BOTONES DEL MENU HAMBUERGUESA
const btnAbrirMenuHamburguesa = document.getElementById('btnAbrirMenuHamburguesa');
const btnCerrarMenuHamburguesa = document.getElementById('btnCerrarMenuHamburguesa');
const navId = document.getElementById('navId'); 

btnAbrirMenuHamburguesa.addEventListener('click', ()=>{
    navId.classList.add('visible');
})

btnCerrarMenuHamburguesa.addEventListener('click', ()=>{
    navId.classList.remove('visible');
})
//---------------------------------------------------------------------------------------------------------------------



function generarStringQuery(filters) {
    if (!filters) return "";

    let queryString = '?';
    const list = Object.entries(filters);

    if (list.length < 1) return "";

    for (let i = 0; i < list.length; i++) {
        const [key, value] = list[i];
        queryString += `${key}=${value}&`;
    }

    return queryString;
}

function generarUrl(path, filters) {
    const queryString = generarStringQuery(filters);

    return `${API}/${path}${queryString}`;
}

async function fetchData(path, filters) {
    const query = generarUrl(path, filters);

    return await fetch(query, {
        method: 'GET', headers: {
            "Accept": "*/*",
        }
    }).then(response => {
        if (response.status !== 200) {
            throw new Error("Hubo un error, intente mas tarde");
        }

        return response.json();
    });
}


//SE REALIZA EL FILTRADO DE PRODUCTOS

async function onSubmit(event) {
    
    mostrarResultado.classList.add('mostrarResultadoBusqueda');
    mostrarResultado.style.display = 'block';
    mostrarResultado.style.display = 'flex';
    event.preventDefault();
    const formData = new FormData(formularioHeader);
    const filterList = Object.fromEntries(formData.entries());
    try {
        const characterData = await fetchData(FILTRO.characters, filterList);
        populateHome({items: characterData});
    } catch (error) {
        mostrarResultado.innerHTML = "Hubo un error inesperado";
        alert('Ups, surgio un error inesperado, lo sentimos!')
    }
}

formularioHeader.addEventListener('submit', onSubmit);
//---------------------------------------------------------------------------------------------------------------



// SE REALIZA LA PETICIÓN POST PARA 'SUBIR' UN PRODUCTO Y SER MOSTRADO, SE UTILIZA LA API DE JSONPLACEHOLDER YA QUE PERMITE REALIZAR EL METODO POST

const productoForm = document.getElementById('productoForm');

productoForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const productoName = document.getElementById('productoName').value;
    const productoDesc = document.getElementById('productoDesc').value;
    const productoPrice = document.getElementById('productoPrice').value;
    const productoImage = document.getElementById('productoImage').value;

    const newProduct = {
        name: productoName,
        description: productoDesc,
        price: productoPrice,
        image: productoImage,
        category: 'producto' 
    };

    console.log(newProduct);

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then(response => response.json()) 
            .then(producto => {

            console.log('Producto creado exitosamente:', producto);

            const container = document.getElementById('contenedorProductoCreado');
            const productCard = document.createElement('div');
            productCard.classList.add('cardProductoCreado');
            container.style.display = 'flex';
            container.innerHTML = "";
            productCard.innerHTML = `
                <img src="${producto.image}" alt="${producto.name}">
                <div>
                    <h3>${producto.name}</h3>
                    <p>${producto.description}</p>
                    <p>Precio: ${producto.price}</p>
                    
                </div>`;
            container.appendChild(productCard);
            })
            .catch(error => {
            console.error('Error al crear el producto:', error);
    });
});
//--------------------------------------------------------------------------------------------------------


// --- VARIABLES ---
const carritoBody2 = document.getElementById("carrito-body");
const precioTotal = document.getElementById('carrito-total');
const btnMostrarCarrito = document.getElementById('btnMostrarCarrito');
const btnCerrarCarrito = document.getElementById('btnCerrarCarrito');
const carritoContainer = document.getElementById('carrito-container');

// PERMITEN MOSTRAR U OCULTAR EL CARRITO DE COMPRAS
btnMostrarCarrito.addEventListener('click', ()=>{
    carritoContainer.style.display = 'block';
})

btnCerrarCarrito.addEventListener('click', ()=>{
    carritoContainer.style.display = 'none';
})
//---------------------------------------------------------------------------------------------------------------------

// REVISA Y CARGA SI HAY DATOS PREEXISTENTES
let productosGuardados = JSON.parse(localStorage.getItem("productosDragonBall")) || [];
//---------------------------------------------------------------------------------------------------------------------

// FUNCIÓN PARA AGREGAR PRODUCTO AL CARRITO 
function agregarAlCarrito(nombre, precio) {0
    let productosGuardados = JSON.parse(localStorage.getItem("productosDragonBall")) || [];
    const nuevoProducto = {
        id: Date.now(),
        nombre: nombre,
        precio: precio
    };

    productosGuardados.push(nuevoProducto);
    localStorage.setItem("productosDragonBall", JSON.stringify(productosGuardados));
    renderizarCarrito();
}
//---------------------------------------------------------------------------------------------------------------------

// FUNCIÓN PARA MOSTRAR EL PRODUCTO EN EL CARRITO 
function renderizarCarrito() {
    let productosGuardados = JSON.parse(localStorage.getItem("productosDragonBall")) || [];
    carritoBody2.innerHTML = '';
    let precioInicial = 0;

    productosGuardados.forEach(personaje => {
        const productoDiv = document.createElement('div');
        const btnEliminarProCarrito = document.createElement('button');

        precioInicial += parseInt(personaje.precio);

        productoDiv.textContent = `${personaje.nombre} - $${personaje.precio}`;
        btnEliminarProCarrito.textContent = 'X';
        btnEliminarProCarrito.style.cursor = 'pointer';

        productoDiv.style.display = 'flex';
        productoDiv.style.justifyContent = 'space-between';
        productoDiv.style.gap = '30px';
        productoDiv.style.marginRight = '5px';
        productoDiv.style.marginBottom = '5px';

        productoDiv.append(btnEliminarProCarrito);
        carritoBody2.append(productoDiv);

        // ELIMINO PRODUCTO DEL CARRITO (DE MANERA INDIVIDUAL)
        btnEliminarProCarrito.addEventListener('click', () => {
            productosGuardados = productosGuardados.filter(p => p.id !== personaje.id);
            localStorage.setItem("productosDragonBall", JSON.stringify(productosGuardados));
            renderizarCarrito();
        });
    });

    precioTotal.textContent = `Total: $${precioInicial}`;
}
//---------------------------------------------------------------------------------------------------------------------

// SE CREA LA CARD DEL PRODUCTO BUSCADO
function cardProductoBuscado(personaje) {
    let precio = personaje.ki;
        if(precio == 0){
            precio = 1
        } else {
            precio = personaje.ki
    }
    return `
        <div class="cardProductoBuscado">                   
            <img class="imgCardProductoBuscado" src="${personaje.image}" alt="">
            <div class="containerComponentesCard">
                <h3>${personaje.name}</h3>
                <p>$${precio || 0}</p>

                <div class="containerBotonesCard">
                    <button><a href="./apartadoDetalle/detalleProducto.html?id=${personaje.id}" target="_blank">Detalles</a></button>
                    <button class="btnAgregarCarrito" 
                            data-nombre="${personaje.name}" 
                            data-precio="${precio || 0}">
                            Add to cart
                    </button>                
                </div>
            </div>
        </div>
    `;
}
//---------------------------------------------------------------------------------------------------------------------

// FUNCIÓN DONDE SE MUESTRAN LOS RESULTADOS DE LA BUSQUEDA LLAMANDO A CARDPRODUCTOBUSCADO PARA CREAR LAS CARDS
function populateHome(data) {
    mostrarResultado.innerHTML = "";

    if (data.items.length < 1) {
        mostrarResultado.innerHTML = "La busqueda no ha encontrado resultados :(";
        return;
    }
    
    for (const item of data.items) {
        mostrarResultado.innerHTML += cardProductoBuscado(item);
    }

}
//---------------------------------------------------------------------------------------------------------------------

// FUNCIÓN DONDE SE REALIZA LA BUSQUEDA 
async function busquedaProducto(name) {
    fetch(`https://dragonball-api.com/api/characters?name=${name}&limit=1`)
        .then(response => response.json())
        .then(data => {
            populateHome({ items: data });
        })
        .catch(error => console.error("Error en búsqueda:", error));
}
//---------------------------------------------------------------------------------------------------------------------


// CUANDO SE REALIZA EL ENVIO DEL FORMULARIO SE LLAMA A LA FUNCION BUSQUEDA
formularioHeader.addEventListener("submit", (event) => {
    event.preventDefault();
    busquedaProducto(inputSearch.value);
});
//---------------------------------------------------------------------------------------------------------------------




// EVENTO GLOBAL PARA QUE TODOS LOS BOTONES ADD TO CART FUNCIONEN AGREGANDO EL PRODUCTO AL CARRITO
document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('btnAgregarCarrito')) {
        const nombre = e.target.dataset.nombre;
        const precio = parseInt(e.target.dataset.precio);
        agregarAlCarrito(nombre, precio);
    }
});
//---------------------------------------------------------------------------------------------------------------------


//RENDERIZO EL CARRITO CADA 2 SEGS PARA QUE AL AGREGAR UN PRODUCTO DESDE OTRO ARHCHIVO HTML SE VEA REFLEJADO AL INSTANTE Y NO SOLO CUANDO SE RECARGUE LA PAGINA
setInterval(renderizarCarrito, 2000);
//---------------------------------------------------------------------------------------------------------------------


// AL CARGAR LA PAGINA TRAIGO LOS PRODUCTOS POPULARES Y MUESTRO LO QUE EL CARRITO TENGA GUARDADO
document.addEventListener('DOMContentLoaded', () => {
    traerProductosPopulares();
    renderizarCarrito();
});
//---------------------------------------------------------------------------------------------------------------------

// MANEJO EL SIMULADOR DE PAGO
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const btnCerrar = document.getElementById('btnCerrarModalPago');
    const btnPagar = document.getElementById('btnPagar');
    const tarjetaForm = document.getElementById('tarjetaForm');
    const procesoPago = document.getElementById('procesoPago');
    const resultadoPago = document.getElementById('resultadoPago');
    const mensajePago = document.getElementById('mensajePago');
    const imagenPago = document.getElementById('imagenPago');
    const imagenSpinner = document.getElementById('imagenSpinner');
    const btnFinalizarCompra = document.getElementById('finalizarCompra');

    function abrirModalPago() {
        modal.classList.add('visible');
        
        tarjetaForm.style.display = 'block';
        procesoPago.style.display = 'none';
        resultadoPago.style.display = 'none';
    }

    function cerrarModal() {
        modal.classList.remove('visible');
    }

    btnFinalizarCompra.addEventListener('click',()=>{
        let productosGuardados = JSON.parse(localStorage.getItem("productosDragonBall")) || [];
        if (productosGuardados.length === 0) {
            alert("Upps! Para finalizar la compra, debes tener productos en el carrito.");
        } else {
            abrirModalPago();
            carritoContainer.style.display = 'none';
        }

    });

    btnCerrar.addEventListener('click', cerrarModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            cerrarModal();
        }
    });

    btnPagar.addEventListener('click', () => {
        const numeroTarjeta = document.getElementById('numero-tarjeta').value;
        const nombreTarjeta = document.getElementById('nombre-tarjeta').value;
        const codSeguridad = document.getElementById('cvv').value;
        if (numeroTarjeta.length < 16 || nombreTarjeta === '' || codSeguridad ==='' || codSeguridad.length < 3) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        tarjetaForm.style.display = 'none';
        procesoPago.style.display = 'block';

        imagenSpinner.src = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG55cXk1dDMzanRzZzdtYXRxZTI2NG12Z3A1aGE0MXpiMGNxNzBkdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d5fMI9ftgQiGzoZoB9/giphy.gif';

        // SIMULA TIEMPO DE ESPERAR PARA QUE SE REALICE EL PAGO
        setTimeout(() => {
            const pagoExitoso = Math.random() < 0.8; // PERMITE TENER UN 80% DE POSIBLIDAD DE QUE EL PAGO SE REALICE DEJANDO UN 20% DE FALLO PARA DAR CIERTO REALISMO
            procesoPago.style.display = 'none';
            resultadoPago.style.display = 'block';
            

            if (pagoExitoso) {
                mensajePago.textContent = '¡Pago Exitoso!';
                mensajePago.style.color = 'green';
                imagenPago.src = 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWpxcWNsd3M5anpoazBsZnI2NXBjZDl3eTM3am43cmp6dnA1YjB3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WUDGo9jYZzVt3DExhi/giphy.gif';
                localStorage.setItem("productosDragonBall", JSON.stringify([]));
                renderizarCarrito();
            } else {
                mensajePago.textContent = '¡Pago Fallido!';
                mensajePago.style.color = 'red';
                imagenPago.src = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmZxNWZtdHBtbGk1dmx0dndndDFlaGJzbjQ5bjh1b3E3MjVqd3ZsaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yN1ggBGncgAW4/giphy.gif';
            }
        }, 5050);
    });
});

//--------------------------------------------------------------------------------------------------------------------------