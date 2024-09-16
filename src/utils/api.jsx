const baseUrl = "http://localhost:3001"

function getItem(){
    return fetch(`${baseUrl}/items`).then(res => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    })
}

export {getItem, baseUrl}