import React from "react"
import { connect } from "react-redux"
import seriesAction from "../redux/actions/seriesAction"
import Lastest from "../components/Lastest"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Loader from "../components/Loader"


class Series extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    state={
        series:[],
        mostPopular:[] ,
        action: [],
        comedy: [],
        scienceFiction:[],
        crime:[]
    }

    componentDidMount(){
        this.props.fetchSeries()
        .then( data =>{
            this.setState({ ...this.state,
                series: data,
                action: data.filter( serie => serie.categories.includes( "Action" ) ),
                comedy: data.filter( serie => serie.categories.includes( "Comedy" ) ),
                scienceFiction: data.filter( serie => serie.categories.includes( "Science Fiction" ) ),
                crime: data.filter( serie => serie.categories.includes( "Crime" ) )
            })
        })
    }

    
    render() {
        return(
            <div className="seriesContainer">
                <Header/>
            {
                !this.state.action.length
                ?  <Loader />
                : <>
                    <Lastest title={ "Action" } array={ this.state.action } />

                    <Lastest title={ "Comedy" } array={ this.state.comedy } />

                    <Lastest title={ "Science Fiction" } array={ this.state.scienceFiction } />

                    <Lastest title={ "Crime" } array={ this.state.crime } />
                </>
            }
                
                <Footer />
            </div>        
        )
    }
}

const mapDispatchToProps ={
    fetchSeries:seriesAction.fetchSeries
}


export default connect(null, mapDispatchToProps) (Series)
