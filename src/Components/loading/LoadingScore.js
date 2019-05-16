import React, { Component } from "react"
import LoadingScreen from 'react-loading-screen';

export default class LoadingScore extends Component {

    state = {
        loading: true,
        data: null
    }

    componentDidMount() {
        window.scrollTo(0,0)
        if(this.state.loading === true){
            this.dataDidLoad()
        }
    }

    dataDidLoad = () => {
       return setTimeout(this.props.scoreLoadingChange, 1500)
    }

    render(){
        return (
            <LoadingScreen
                loading={this.state.loading}
                bgColor='#bbc0c9'
                spinnerColor='#5f86d3'
                textColor='#f9fbff'
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