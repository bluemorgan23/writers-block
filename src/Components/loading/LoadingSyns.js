import React, { PureComponent } from "react"

import cache from "../../modules/cache"
import synAPI from "../../modules/synAPI"
import entryData from "../../modules/entryData"
import filtering from "../../modules/filter"


import LoadingScreen from 'react-loading-screen';


export default class LoadingSyns extends PureComponent {

    state = {
        data: null,
        loading: false
    }

    onContinue = () => {
        this.props.history.push("/synonyms")
    }


    async componentDidMount() {
            
            window.scrollTo(0,0)
  
            let idToGrab = Number(sessionStorage.getItem("currentEntryID"))
            
            const response = entryData.getCurrentEntry(idToGrab)
            const json = await response
            console.log(json.body)
            const wordArray = await filtering.getRidOfPunctuation(json.body)
         
            const newArray = await filtering.filterOutWeakWords(wordArray)

            const cachedData = await cache.locStr(newArray)
            const lowScoringWords = cachedData.filter(word => word.response.ten_degree < this.props.avgScore)

         

            const justWord = lowScoringWords.map(word => word.response.entry)

            const arrayOfSentences = justWord.map(word => this.sentencesContainWords(this.props.sentenceArray, word))

      
            Promise.all(arrayOfSentences)
            .then(newArray => newArray.filter(response => response !== undefined && response.sentence !== undefined))
            .then(response => this.props.grabData(response))
            .then(response => setTimeout(this.setState({ data: response, loading: true}), 1500))
            .then(() => setTimeout(this.onContinue, 2000))
      
        
    }

    componentWillUnmount() {
        this.setState({data: null, loading: false})
    }


   sentencesContainWords(sentenceArray, word) {
        
        let sentenceString = sentenceArray.find(sentence => {
            return sentence.includes(word)
        })

        let newObj = {sentence: sentenceString, word: word, index: sentenceArray.indexOf(sentenceString), matches: []}

        return synAPI.getSynonymsForWord(word)
        .then(results => {
            if(results.length > 0){
                newObj.matches = results
                return newObj 
            }    
        })
    }

    render() {
        return (
          
            <LoadingScreen
                loading={this.state.loading}
                bgColor='#bbc0c9'
                spinnerColor='#5f86d3'
                textColor='#f9fbff'
                text='Checking for Synonyms...'
                    > 
    
            <div></div>
            </LoadingScreen>
            
           
        )
    }
}