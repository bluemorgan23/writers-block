const baseURL = "https://writersblockapi.herokuapp.com/users"

const userData = {
    getAllUsers: () => {
        return fetch(baseURL)
            .then(listOfUsers => listOfUsers.json())
    },
    postUser: (newUserData) => {
        return fetch(baseURL, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newUserData)
        }).then(r => r.json())
    }
}

export default userData