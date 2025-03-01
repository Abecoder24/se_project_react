const baseUrl = "http://localhost:3001"
function getItem() {
    return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem(data, token) {
    return fetch(baseUrl + "/items", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(checkResponse);
}

function deleteItem(id, token) {
    return fetch(baseUrl + "/items/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    }).then(checkResponse);
}

//login
function loginUser(data) {
    return fetch(baseUrl + "/signin", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(checkResponse)
}
//register
function registerUser(data) {
    console.log(data)
    return fetch(baseUrl + "/signup", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(checkResponse)
}

//update profile data
function updateUserData(data, token) {
    return fetch(baseUrl + "/users/me", {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(checkResponse)
}

//add Like to Item
function addCardLike(id, token) {
    return fetch(baseUrl + "/items/" + id + "/likes", {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    }).then(checkResponse)
}
//remove Like from Item
function removeCardLike(id, token) {
    return fetch(baseUrl + "/items/" + id + "/likes", {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    }).then(checkResponse)
}
//verify tokken
function checkToken(token) {
    return fetch(baseUrl + "/users/me", {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    }).then(checkResponse)
}


function checkResponse(res) {
    if (res.ok) {
        let jsonParsable = res.headers.get('Content-Type', '').includes('application/json')
        if (jsonParsable) {
            return res.json()
        } else {
            return res
        }
    } else {
        return Promise.reject(`Error: ${res.status}`)
    }
}

export { getItem, addItem, deleteItem, checkResponse, loginUser, checkToken, registerUser, updateUserData, addCardLike, removeCardLike }