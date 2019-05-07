import scoreAPI from "./scoreAPI"

const cache = {

    eachScore: JSON.parse(localStorage.getItem("eachScore")),
    locStr: (wordArray) => {
        let wordsAndScore = []

        if(JSON.parse(localStorage.getItem("eachScore"))){
            return JSON.parse(localStorage.getItem("eachScore"))
        } else {
            
            
            return wordArray.forEach(word => scoreAPI.getIndividualWordScore(word)
                .then(response => { 
                    if(response.ten_degree){
                      wordsAndScore.push({response})  
                    }
                })
                .then(() => localStorage.setItem("eachScore", JSON.stringify(wordsAndScore))))
            
           
        }
    }
}

export default cache


