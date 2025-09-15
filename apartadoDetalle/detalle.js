    const BASE_API = "https://dragonball-api.com/api";
    const params = new URLSearchParams(window.location.search);
    const characterId = params.get("id");

    const content = document.getElementById("content");

    const query = BASE_API + '/characters/' + characterId;
    fetch(query, {
        method: "GET",
        headers: {
            "Accept": "*/*",
        }
    }).then(response => response.json())
        .then(response => {
            content.innerHTML = `
            <div>
            <h2>${response.name}</h2>
            <p>ID: ${response.id}</p>
            <p>${response.description}</p>
            <p>$${response.ki}</p>
            </div>
            `;
        });