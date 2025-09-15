fetch('https://dragonball-api.com/api/characters?page=6&limit=4')
    .then(response => response.json())
    .then(data => console.log(data));



const BASE_API = "https://dragonball-api.com/api";
const ENDPOINTS = Object.freeze({
    characters: "characters",
    planets: "planets",
    transformation: "transformation",
});

const formularioHeader = document.getElementById('formularioHeader');
const inputSearch = document.getElementById('inputSearch');
const btnSearch = document.getElementById('btnSearch');
const mostrarResultado = document.getElementById('result');

const contenedorProductosPops = document.getElementById('contenedorProductosPops');



async function Bring() {
    const page = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    console.log('random ' + page);

    fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=4`)
        .then(response => {
            // Check if the request was successful (status code in the 200s)
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse the response body as JSON
            return response.json();
        })
        // .then(data => {
        //     // Process the retrieved data
        //     console.log(data.items);
        //     data.items.forEach(element => {
        //         let containerElement = document.createElement('div');
        //         let nameElement = document.createElement('h2');
        //         nameElement.className += 'text-center font-bold text-2xl';
        //         containerElement.className += 'w-100 h-100 bg-blue-300 place-self-center m-4 bg-contain bg-no-repeat bg-center';
        //         containerElement.style.backgroundImage = `url(\'${element.image}\')`;
        //         nameElement.innerHTML = element.name;
        //         displayRandom.append(containerElement);
        //         displayRandom.append(nameElement);
        //         containerElement.dataset.id = element.id;
        //         containerElement.addEventListener('click', DebugInfo)
        //     });
        // })
        .then(data => {
            // Process the retrieved data
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
                            data-precio="${personaje.ki || 0}">
                            Add to cart
                        </button>     
                    </div>
                </div>
                `;
                contenedorProductosPops.innerHTML += newContent;
            });

            
        })
        .catch(error => {
            // Handle any errors during the fetch operation
            console.error('Error fetching data:', error);
        });
}





formularioHeader.addEventListener('submit', (event) => {
    event.preventDefault();
    Search(inputSearch.value);
})



const btnAbrirMenuHamburguesa = document.getElementById('btnAbrirMenuHamburguesa');
const btnCerrarMenuHamburguesa = document.getElementById('btnCerrarMenuHamburguesa');
const navId = document.getElementById('navId'); 

btnAbrirMenuHamburguesa.addEventListener('click', ()=>{
    navId.classList.add('visible');
})

btnCerrarMenuHamburguesa.addEventListener('click', ()=>{
    navId.classList.remove('visible');
})



// async function Search(name) {
//     fetch(`https://dragonball-api.com/api/characters?name=${name}&limit=1`)
//         .then(response => {
//             // Check if the request was successful (status code in the 200s)
//             if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             // Parse the response body as JSON
//             return response.json();
//         })
//         .then(data => {
//             // Process the retrieved data
//             console.log(data);
//             console.log(data[0].image);
//             console.log(data[0].name)
//             // container.style.backgroundImage = `url(\'${data[0].image}\')`;
//             // label.innerHTML = data[0].name;
//             // container.dataset.id = data[0].id;
//             // container.addEventListener('click', DebugInfo)

//             // container.classList.remove('hidden');
//             // label.classList.remove('hidden');

//             // displayRandom.classList.add('hidden');
//         })
//         .catch(error => {
//             // Handle any errors during the fetch operation
//             console.error('Error fetching data:', error);
//         });
// }







function generateQueryString(filters) {
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

function generateQueryUrl(path, filters) {
    const queryString = generateQueryString(filters);

    return `${BASE_API}/${path}${queryString}`;
}

async function fetchData(path, filters) {
    const query = generateQueryUrl(path, filters);

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

// function populateHome(data) {
//     mostrarResultado.innerHTML = null;

//     if (data.items.length < 1) {
//         mostrarResultado.innerHTML = "No se encontro data";
//         alert('Lo siento, no pudimos encontrar información acerca de tu busqueda.')
//         return;
//     }

//     for (const item of data.items) {
//         // mostrarResultado.innerHTML += `<a href="detalleProducto.html?id=${item.id}"><p>${item.name}</p> <p class="color">${item.name}</p> </a>`;
//         mostrarResultado.innerHTML += `
//                 <div class="cardProductoBuscado">                   
//                     <img class="imgCardProductoBuscado" src="${item.image}" alt="">
//                     <div>
//                         <h3 id="nombreProducto">${item.name}</h3>
//                         <p id="precioProducto">$${item.ki}</p>
//                         <button><a href="detalleProducto.html?id=${item.id}">Detalles</a></button>
//                         <button id="btnAgregarCarrito">Add to cart</button>
//                     </div>
//                 </div>
//                 `;
//     }
// }

async function onLoad() {
    const characters = await fetchData(ENDPOINTS.characters);

    populateHome(characters);
}


async function onSubmit(event) {
    mostrarResultado.classList.add('mostrarResultadoBusqueda');
    mostrarResultado.style.display = 'block';
    mostrarResultado.style.display = 'flex';
    event.preventDefault();
    const formData = new FormData(formularioHeader);
    const filterList = Object.fromEntries(formData.entries());
    try {
        const characterData = await fetchData(ENDPOINTS.characters, filterList);
        populateHome({items: characterData});
    } catch (error) {
        mostrarResultado.innerHTML = "Hubo un error inesperado";
        alert('Ups, surgio un error inesperado, lo sentimos!')
    }
}

// addEventListener('load', onLoad);
formularioHeader.addEventListener('submit', onSubmit);
























// FUNCIONES PARA EL CARRITO


// --- VARIABLES ---
// const mostrarResultado = document.getElementById('result');
// const contenedorProductosPops = document.getElementById('contenedorProductosPops');
const carritoBody2 = document.getElementById("carrito-body");
const precioTotal = document.getElementById('carrito-total');
// const formularioHeader = document.getElementById('formularioHeader');
// const inputSearch = document.getElementById('inputSearch');

const btnMostrarCarrito = document.getElementById('btnMostrarCarrito');
const btnCerrarCarrito = document.getElementById('btnCerrarCarrito');
const carritoContainer = document.getElementById('carrito-container');

//MANEJO DE MOSTRAR U OCULTAR EL CARRITO DE COMPRAS

btnMostrarCarrito.addEventListener('click', ()=>{
    carritoContainer.style.display = 'block';
})

btnCerrarCarrito.addEventListener('click', ()=>{
    carritoContainer.style.display = 'none';
})

// Cargar productos previos si existen
let productosGuardados = JSON.parse(localStorage.getItem("productosGallery")) || [];

// --- FUNCION PARA AGREGAR AL CARRITO ---
function agregarAlCarrito(nombre, precio) {
    const nuevoProducto = {
        id: Date.now(), // id único
        nombre: nombre,
        precio: precio
    };

    productosGuardados.push(nuevoProducto);
    localStorage.setItem("productosGallery", JSON.stringify(productosGuardados));
    renderizarCarrito();
}

// --- FUNCION PARA MOSTRAR EL CARRITO ---
function renderizarCarrito() {
    carritoBody2.innerHTML = '';
    let precioInicial = 0;

    productosGuardados.forEach(producto => {
        const productoDiv = document.createElement('div');
        const carritoEliminarStorage = document.createElement('button');

        precioInicial += parseInt(producto.precio);

        productoDiv.textContent = `${producto.nombre} - $${producto.precio}`;
        carritoEliminarStorage.textContent = 'X';
        carritoEliminarStorage.style.cursor = 'pointer';

        productoDiv.style.display = 'flex';
        productoDiv.style.justifyContent = 'space-between';
        productoDiv.style.gap = '30px';
        productoDiv.style.marginRight = '5px';
        productoDiv.style.marginBottom = '5px';
        // productoDiv.style.justifyContent = "space-between";

        productoDiv.append(carritoEliminarStorage);
        carritoBody2.append(productoDiv);

        // Eliminar producto del carrito
        carritoEliminarStorage.addEventListener('click', () => {
            productosGuardados = productosGuardados.filter(p => p.id !== producto.id);
            localStorage.setItem("productosGallery", JSON.stringify(productosGuardados));
            renderizarCarrito();
        });
    });

    precioTotal.textContent = `Total: $${precioInicial}`;
}

// --- CREAR CARD DE PRODUCTO ---
function crearCard(personaje) {
    return `
        <div class="cardProductoBuscado">                   
            <img class="imgCardProductoBuscado" src="${personaje.image}" alt="">
            <div class="containerComponentesCard">
                <h3>${personaje.name}</h3>
                <p>$${personaje.ki || 0}</p>

                <div class="containerBotonesCard">
                    <button><a href="./apartadoDetalle/detalleProducto.html?id=${personaje.id}">Detalles</a></button>
                    <button class="btnAgregarCarrito" 
                            data-nombre="${personaje.name}" 
                            data-precio="${personaje.ki || 0}">
                            Add to cart
                    </button>                
                </div>
            </div>
        </div>
    `;
}

// --- MOSTRAR RESULTADOS DE BUSQUEDA ---
function populateHome(data) {
    mostrarResultado.innerHTML = "";

    if (data.items.length < 1) {
        mostrarResultado.innerHTML = "No se encontró nada 😢";
        return;
    }

    for (const item of data.items) {
        mostrarResultado.innerHTML += crearCard(item);
    }
}

// --- FUNCION DE BUSQUEDA ---
async function Search(name) {
    fetch(`https://dragonball-api.com/api/characters?name=${name}&limit=1`)
        .then(response => response.json())
        .then(data => {
            // la API devuelve un array, lo convertimos a { items: [...] }
            populateHome({ items: data });
        })
        .catch(error => console.error("Error en búsqueda:", error));
}

// --- EVENTO FORMULARIO ---
formularioHeader.addEventListener("submit", (event) => {
    event.preventDefault();
    Search(inputSearch.value);
});

// --- EVENTO GLOBAL PARA BOTONES ADD TO CART ---
document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('btnAgregarCarrito')) {
        const nombre = e.target.dataset.nombre;
        const precio = parseInt(e.target.dataset.precio);
        agregarAlCarrito(nombre, precio);
    }
});

// --- MOSTRAR PRODUCTOS RANDOM EN HOME ---
// async function Bring() {
//     const page = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

//     fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=4`)
//         .then(response => response.json())
//         .then(data => {
//             contenedorProductosPops.innerHTML = "";
//             data.items.forEach(personaje => {
//                 contenedorProductosPops.innerHTML += crearCard(personaje);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

// --- AL CARGAR LA PAGINA ---
document.addEventListener('DOMContentLoaded', () => {
    Bring();           // cargar productos aleatorios
    renderizarCarrito(); // cargar carrito guardado
});



