import React from "react"
import Carrousel from "../components/Carrousel"
import Footer from "../components/Footer"
import Lastest from "../components/Lastest"
import seriesAction from "../redux/actions/seriesAction"
import { connect } from "react-redux"
import Header from "../components/Header"


class Home extends React.Component{
    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}
    state={
        series:[],
        movies:[]
    }
    componentDidMount(){
        this.props.fetchSeries()
        .then( data =>{
            this.setState({ ...this.state, series: data })
        })
        this.props.fetchMovies()
        .then( data =>{
            this.setState({ ...this.state, movies: data })
        })
    }



    render() {
        return(
            <div>
                <Header/>
                <Carrousel />
                <Lastest title={'Lastest Series'} array={ this.state.series} />
                <Lastest title={'Lastest Movies'} array={ this.state.movies} />
                <Footer/>
            </div>        
        )
    }
}
const mapDispatchToProps ={
    fetchSeries: seriesAction.fetchSeries,
    fetchMovies: seriesAction.fetchMovies
}

export default connect(null, mapDispatchToProps) (Home)
