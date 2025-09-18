const API = "https://dragonball-api.com/api";
let paginaActual = 1;
const limit = 5;

function buildQuery(page) {
    return `${API}/characters?page=${page}&limit=${limit}`;
}

    const sectionDetalle = document.getElementById('sectionDetalle');
    const query = API + '/characters?' +'limit=' +  limit;


async function loadCharacters(page) {
    const query = buildQuery(page);

    try {
        const response = await fetch(query);
        const data = await response.json();

        sectionDetalle.innerHTML = '';
        
        data.items.forEach(personaje => {
            const precioRandom = Math.floor(Math.random() * 150) + 1;
            sectionDetalle.innerHTML += `
            <div class="contenedorCardDetalles">
                <img src="${personaje.image}" alt="foto de ${personaje.name}">
                <div class="descripcionDetalles">
                    <h1>${personaje.affiliation}</h1>
                    <p>N° DE TOMO: ${personaje.id}</p>
                    <p> PRECIO: $${precioRandom} USD</p>
                    <p>DISTRIBUYE: IVREA</p>
                    <button class="btnAgregarCarrito" data-nombre="${personaje.affiliation} TOMO N°: ${personaje.id}" data-precio="${precioRandom || 0}">Add to cart</button>
                </div>
            </div>`;
        });
    } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
}


const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnAnterior.addEventListener('click', () => {
    if (paginaActual > 1) {
        paginaActual--;
        loadCharacters(paginaActual);
    }
});

btnSiguiente.addEventListener('click', async () => {
    const nextPageQuery = buildQuery(paginaActual + 1);
    try {
        const response = await fetch(nextPageQuery);
        const data = await response.json();
        
        if (data.items.length > 0) {
            paginaActual++;
            loadCharacters(paginaActual);
        } else {
            alert("Estás en la última página. No hay más elementos para cargar.");
        }
    } catch (error) {
        alert("Error al verificar la siguiente página:", error);
    }
});

loadCharacters(paginaActual);

const btnVolver = document.getElementById('btnVolverPagPrincipal');

btnVolver.addEventListener('click', ()=>{
    window.close(); 
    
    if (window.opener) {
        window.opener.focus();
    }
})

let productosGuardados = JSON.parse(localStorage.getItem("productosDragonBall")) || [];


function agregarAlCarrito(nombre, precio) {
    let productosGuardados = JSON.parse(localStorage.getItem("productosDragonBall")) || [];
    const nuevoProducto = {
        id: Date.now(),
        nombre: nombre,
        precio: precio
    };
    productosGuardados.push(nuevoProducto);
    localStorage.setItem("productosDragonBall", JSON.stringify(productosGuardados));
}

// AGREGO EL PRODUCTO A LOCALSTORAGE
document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('btnAgregarCarrito')) {
        const nombre = e.target.dataset.nombre;
        const precio = parseInt(e.target.dataset.precio);
        agregarAlCarrito(nombre, precio);
    }
});
