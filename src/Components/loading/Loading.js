import React, { PureComponent } from "react"

import cache from "../../modules/cache"
import synAPI from "../../modules/synAPI"
import entryData from "../../modules/entryData"
import filtering from "../../modules/filter"
import { Card, CardHeader, Button, CardBody } from "reactstrap"
import Synonyms from "../synonyms/Synonyms"

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
  
        // const cachedData = await cache.eachScore
        // if(cachedData){
            
        //     const lowScoringWords = cachedData.filter(word => word.response.ten_degree < this.props.avgScore)

            

        //     const justWord = lowScoringWords.map(word => word.response.entry)

        //     const arrayOfSentences = justWord.map(word => this.sentencesContainWords(this.props.sentenceArray, word))

        //     Promise.all(arrayOfSentences)
        //     .then(newArray => newArray.filter(response => response !== undefined && response.sentence !== undefined))
        //     .then(response => this.props.grabData(response))
        //     .then(response => this.setState({loading: true, data: response}))
        //     .then(() => setTimeout(this.onContinue, 2000))
        // } else {
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
            .then(response => this.setState({ data: response, loading: true}))
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
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                text='Checking for Synonyms'
                    > 
    {/* // ...
    // here loadable content
    // for example, async data
    //<div>Loadable content</div> */}
            
            </LoadingScreen>
            
           
        )
    }
}