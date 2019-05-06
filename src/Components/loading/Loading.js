import React, { PureComponent } from "react"

import cache from "../../modules/cache"
import synAPI from "../../modules/synAPI"
import entryData from "../../modules/entryData"
import filtering from "../../modules/filter"
import { Card, CardHeader, Button, CardBody } from "reactstrap"



export default class Loading extends PureComponent {

    state = {
        data: null,
        isLoading: true
    }

    onContinue = () => {
        return this.props.history.push("/synonyms")
    }


    async componentDidMount() {
  
        const cachedData = await cache.eachScore
        if(cachedData){
            
            const lowScoringWords = cachedData.filter(word => word.response.ten_degree < this.props.avgScore)

            

            const justWord = lowScoringWords.map(word => word.response.entry)

            const arrayOfSentences = justWord.map(word => this.sentencesContainWords(this.props.sentenceArray, word))

            Promise.all(arrayOfSentences)
            .then(newArray => newArray.filter(response => response !== undefined && response.sentence !== undefined))
            .then(response => this.props.grabData(response))
            .then(response => this.setState({isLoading: false, data: response}))
        } else {
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
            .then(response => this.setState({isLoading: false, data: response}))
      
        }
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
            <Card>
                <CardHeader>Searching for synonyms</CardHeader>
                <CardBody>
                   {!this.state.isLoading && 
                    <Button onClick={this.onContinue}
                    >Continue</Button>
                   }
                </CardBody>
                
            </Card>
        )
    }
}