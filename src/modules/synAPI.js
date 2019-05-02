const baseURL = "https://api.datamuse.com/words?rel_syn="

// const apiKey = "19783159f2msh8d529c3b101051ep17b582jsn2a291563b2cd"

const synAPI = {
    getSynonymsForWord: (word) => {
        return fetch(`${baseURL}${word}&max=5`)
        .then(response => response.json())
        .then(parsedResponse => parsedResponse.filter(words => {
            return words.score > 1000
        } ))
    }
}

export default synAPI