const baseUrl = "http://localhost:3001"

function getItem() {
    return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem(data) {
    const { clothName, clothWeatherType, clothImageURL } = data
    return fetch(baseUrl + "/items/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: clothName,
            weather: clothWeatherType,
            imageUrl: clothImageURL
        })
    }).then(checkResponse);
}

function deleteItem(id) {
    return fetch(baseUrl + "/items/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(checkResponse);
}

function checkResponse(res) {
    if (res.ok) {
        console.log('what')
        console.log(res)
        console.log('what')
        let jsonParsable = res.headers.get('Content-Type', '').includes('application/json')
        if (jsonParsable) {
            return res.json()
        } else {
            return res
        }
    } else {
        Promise.reject(`Error: ${res.status}`)
    }
}

export { getItem, addItem, deleteItem }