const API = "https://dragonball-api.com/api";
const params = new URLSearchParams(window.location.search);
const characterId = params.get("id");

const sectionDetalle = document.getElementById("sectionDetalle");

const query = API + '/characters/' + characterId;


fetch(query, {
    method: "GET",
    headers: {
        "Accept": "*/*",
    }
}).then(response => response.json())
    .then(personaje => {
        let personajeId = personaje.id;
        let descripcion = personaje.description;
        if(personajeId == 1){
            descripcion = 'El protagonista de la serie, conocido por su gran poder y personalidad amigable.Es quien terminara siendo el mayor defensor de la Tierra y del Universo 7, logrando mantenerlos a salvo de la destrucción en innumerables ocasiones, a pesar de no considerarse a sí mismo como un héroe o salvador.'
        } else{
            descripcion = personaje.description
        }

        sectionDetalle.innerHTML = `
        <div class="contenedorCardDetalles">
            <img src="${personaje.image}" alt="foto de ${personaje.name}">
            <div class="descripcionDetalles">
                <h1>${personaje.name}</h1>
                <p>N° DE PRODUCTO: ${personaje.id}</p>
                <p> DESCRIPCION: ${descripcion}</p>
                <p> PRECIO: $${personaje.ki} USD</p>
            </div>
        </div>            
        `;

    const btnVolver = document.getElementById('btnVolverPagPrincipal');

    btnVolver.addEventListener('click', ()=>{
        window.close(); 
        
        if (window.opener) {
            window.opener.focus();
        }
    })
});

