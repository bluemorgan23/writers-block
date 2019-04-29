


const filtering = {
    
    removeEmptyStrings: (array) => {
        array.pop()
        let newArray = array.map(sentence => sentence += ".")
        return newArray
    }
}

export default filtering