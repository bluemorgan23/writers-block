

const filtering = {
    
    removeEmptyStrings: (array) => {
        array.pop()
        let newArray = array.map(sentence => sentence += ".")
        return newArray
    },

    getRidOfPunctuation: (string) => {
        return string.toLowerCase().replace(/(?!\w|\s)./g, "")
            .replace(/\s+/g, ' ')
            .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2').split(" ")
    },

    filterOutWeakWords: (array) => {
        let filter1 = "the"
        let filter2 = "can"
        let filter3 = "be"
        let filter4 = "who"
        let filter5 = "are"
        let filter6 = "is"
        let filter7 = "will"
        let filter8 = "to"
        const filters = 
            [
                filter1, 
                filter2, 
                filter3,
                filter4,
                filter5,
                filter6,
                filter7,
                filter8
            ]

        const filteredWords = array.filter(word => !filters.includes(word))

        return filteredWords
    },
    sentencesContainWords: (sentenceArray, word) => {
        
        

        let string = sentenceArray.find(sentence => {
            return sentence.toLowerCase().includes(word.toLowerCase())
        })

        return {[sentenceArray.indexOf(string)]: string}

    }
}

let sentenceArray = ["This sentence contains lots of words." , "This sentence does not have to be a real sentence.", "This sentence is just a filler.", "I need more content"]

let justWords = ["not", "content", "filler"]

justWords.forEach(word => console.log(filtering.sentencesContainWords(sentenceArray, word)))

export default filtering
