const baseURL = "https://api.datamuse.com/words?ml="
const proxyURL = "https://cors-anywhere.herokuapp.com/"
// Words API
// const url = "https://wordsapiv1.p.mashape.com/"
// const key = "19783159f2msh8d529c3b101051ep17b582jsn2a291563b2cd"

// const apiKey = "19783159f2msh8d529c3b101051ep17b582jsn2a291563b2cd"

const synAPI = {
    getSynonymsForWord: (word) => {
        return fetch(`${proxyURL}${baseURL}${word}&max=100`)
        .then(response => response.json())
        .then(parsedResponse => parsedResponse.filter(words => {
            return words.score > 60000
        } )).then(response => response.map(word => word.word))
        .then(response => response.slice(0, 15))
    }
}

export default synAPI




// getSynonymsForWord: (word) => {
//     return fetch(`${url}words/${word}/synonyms`, {
//         method: "GET",
//         headers: {
//             "X-RapidAPI-Key": key,
//             "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
//         }
//     })
//     .then(response => response.json())
//     .then(parsedResponse => parsedResponse.synonyms)
// }


