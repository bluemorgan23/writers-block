const apiKey = "19783159f2msh8d529c3b101051ep17b582jsn2a291563b2cd"
const baseURL = "https://twinword-language-scoring.p.rapidapi.com"

const scoreAPI = {
    getAverageVocabScore: (stringToAnalyze) => {
        return fetch(`${baseURL}/text/?text=${stringToAnalyze}`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey
            }
        })
            .then(response => response.json())
            .then(parsedResponse => localStorage.setItem("AvgPromise", JSON.stringify(parsedResponse)))
    },
    getIndividualWordScore: (wordToAnalyze) => {
        return fetch(`${baseURL}/word/?entry=${wordToAnalyze}`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey
            }
        }).then(response => response.json())
    }
}

export default scoreAPI