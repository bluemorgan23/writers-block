

const auth = {
    isAuthenticated: () => sessionStorage.getItem("userID") !== null,

    isEntrySaved: () => sessionStorage.getItem("currentEntryID") !== null
}

export default auth