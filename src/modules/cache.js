import api from "./api"
import filtering from "./filter"

let string = "The Writer’s Block can be used by anyone who wants to have a second pair of “eyes” to look over your text. An example of the typical user would be someone who frequently sends business emails. This particular user can utilize the app to make sure they are totally confident in the text content of their emails. This application will not solely be beneficial for writers, but my stretch goals aim to provide more analytics that would be useful to a writer."

const wordArray = filtering.getRidOfPunctuation(string)
let filteredArray = filtering.filterOutWeakWords(wordArray)
console.log(filteredArray)



const isAvgStored = () => {
    if(JSON.parse(localStorage.getItem("AvgPromise"))){
        return null
    } else {
        return api.getAverageVocabScore("The Writer’s Block can be used by anyone who wants to have a second pair of “eyes” to look over your text. An example of the typical user would be someone who frequently sends business emails. This particular user can utilize the app to make sure they are totally confident in the text content of their emails. This application will not solely be beneficial for writers, but my stretch goals aim to provide more analytics that would be useful to a writer.")
    }
}

const eachScoreStored = () => {


    let wordsAndScore = []

    if(JSON.parse(localStorage.getItem("eachScore"))){
        return null
    } else {
        
        return filteredArray.forEach(word => api.getIndividualWordScore(word)
            .then(response => { 
                if(response.ten_degree){
                  wordsAndScore.push({[word] : response.ten_degree})  
                }
            })
            .then(() => localStorage.setItem("eachScore", JSON.stringify(wordsAndScore))))
        
       
    }

    
}

isAvgStored()
eachScoreStored()

const cache = {
    avg: JSON.parse(localStorage.getItem("AvgPromise")),
    eachScore: JSON.parse(localStorage.getItem("eachScore"))
} 

export default cache


