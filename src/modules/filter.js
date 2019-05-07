

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
    }
}


export default filtering





