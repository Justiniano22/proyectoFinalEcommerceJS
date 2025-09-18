const API = "https://dragonball-api.com/api";
const limit = 10;
const sectionFiguras = document.getElementById("sectionFiguras");
const query = API + '/characters?' +'limit=' +  limit;


fetch(query, {
    method: "GET",
    headers: {
        "Accept": "*/*",
    }
}).then(response => response.json())
    .then(data => {
        console.log(data.items);
        data.items.forEach(personaje => {
            const altura = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
            const precioRandom = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
            sectionFiguras.innerHTML += `
            <div class="contenedorCardDetalles">
                <img src="${personaje.image}" alt="foto de ${personaje.name}">
                <div class="descripcionDetalles">
                    <h1>${personaje.name} figura</h1>
                    <p>N° DE PRODUCTO: ${personaje.id}</p>
                    <p>MEDIDAS: ${altura} cm de altura. </p>
                    <p> PRECIO: $${precioRandom} USD</p>
                    <button id="" class="btnAgregarCarrito"  data-nombre="${personaje.name} figura" data-precio="${precioRandom || 0}">Add to cart</button>
                </div>
            </div>            
            `;
        })  
});


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

