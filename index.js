fetch('https://dragonball-api.com/api/characters?page=6&limit=4')
    .then(response => response.json())
    .then(data => console.log(data));


const formularioHeader = document.getElementById('formularioHeader');
const inputSearch = document.getElementById('inputSearch');
const btnSearch = document.getElementById('btnSearch');


const contenedorProductosPops = document.getElementById('contenedorProductosPops');


document.addEventListener('DOMContentLoaded', () => {
    Bring();
})

async function Bring() {
    const page = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
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
            data.items.forEach(element => {
                const newContent = `
                <div class="cardProductoPopular">                   
                    <img src="${element.image}" alt="">
                    <div>
                        <h3>${element.name}</h3>
                        <p>$$$</p>
                        <button>Add to cart</button>
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



async function Search(name) {
    fetch(`https://dragonball-api.com/api/characters?name=${name}&limit=1`)
        .then(response => {
            // Check if the request was successful (status code in the 200s)
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse the response body as JSON
            return response.json();
        })
        .then(data => {
            // Process the retrieved data
            console.log(data);
            console.log(data[0].image);
            console.log(data[0].name)
            // container.style.backgroundImage = `url(\'${data[0].image}\')`;
            // label.innerHTML = data[0].name;
            // container.dataset.id = data[0].id;
            // container.addEventListener('click', DebugInfo)

            // container.classList.remove('hidden');
            // label.classList.remove('hidden');

            // displayRandom.classList.add('hidden');
        })
        .catch(error => {
            // Handle any errors during the fetch operation
            console.error('Error fetching data:', error);
        });
}