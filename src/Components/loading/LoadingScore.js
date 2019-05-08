import React, { PureComponent } from "react"
import LoadingScreen from 'react-loading-screen';


import filtering from "../../modules/filter"
import cache from "../../modules/cache"
import entryData from "../../modules/entryData"

export default class LoadingScore extends PureComponent {

    state = {
        loading: true,
        data: null
    }

    onContinue = () => {
        this.props.history.push("/results")
    }

    async componentDidMount() {
        let idToGrab = Number(sessionStorage.getItem("currentEntryID"))
            if(idToGrab){

                const response = entryData.getCurrentEntry(idToGrab)

                const json = await response
            
                const wordArray = await filtering.getRidOfPunctuation(json.body)

           
                const newArray = await filtering.filterOutWeakWords(wordArray)

                this.setState({averageScore: json.avgScore, scoreGroup: await json.scoreGroup})

                cache.locStr(newArray)
    }




    render(){
        return (
            <LoadingScreen
                loading={true}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                text='Calculating your results...'
            > 
            {/* // ...
            // here loadable content
            // for example, async data
            //<div>Loadable content</div> */}
            </LoadingScreen>
        )
    }
}