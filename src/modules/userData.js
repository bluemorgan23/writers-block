const baseURL = "http://localhost:5002/users"

const userData = {
    getAllUsers: () => {
        return fetch(baseURL)
            .then(listOfUsers => listOfUsers.json())
    }
}

export default userData