const baseURL = "http://localhost:5002/entries"

const currentUserId = Number(sessionStorage.getItem("userID"))

const entryData = {
    postNewEntry:(entryObj) => {
        return fetch(baseURL, {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(entryObj)
        }).then(response => response.json())
    },
    getUserEntries: () => {
        return fetch(`${baseURL}?userId=${currentUserId}`)
            .then(response => response.json())
    }
}

export default entryData