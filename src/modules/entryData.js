const baseURL = "http://localhost:5002/entries"



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
        const currentUserId = Number(sessionStorage.getItem("userID"))
        return fetch(`${baseURL}?userId=${currentUserId}`)
            .then(response => response.json())
    },
    getCurrentEntry: (id) => {

        return fetch(`${baseURL}/${id}`)
            .then(response => response.json())
    },
    deleteEntry: (id) => {
        return fetch(`${baseURL}/${id}`, {
            method: "DELETE"
        }).then(response => response.json())
    },
    putEntry: (edit) => {
        return fetch(`${baseURL}/${sessionStorage.getItem("currentEntryID")}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(edit)
        }).then(response => response.json())
    }
}

export default entryData