


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
    }
}

export default filtering