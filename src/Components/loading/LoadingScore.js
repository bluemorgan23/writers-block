import React, { Component } from "react"
import LoadingScreen from 'react-loading-screen';

export default class LoadingScore extends Component {

    state = {
        loading: true,
        data: null
    }

    componentDidMount() {
        if(this.state.loading === true){
            this.dataDidLoad()
        }
    }

    dataDidLoad = () => {
       return setTimeout(this.props.scoreLoadingChange, 2000)
    }

    render(){
        return (
            <LoadingScreen
                loading={this.state.loading}
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