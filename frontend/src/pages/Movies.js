import React from "react"
import Footer from "../components/Footer"
import { connect } from 'react-redux';
import audiovisualActions from '../redux/actions/audiovisualActions'
import Header from "../components/Header";
import Lastest from "../components/Lastest"

class Movies extends React.Component{

    state = {
        movies: [],
        accion: [],
        comedy: [],
        adventure: []

    }

    componentDidMount = async () => {
        var response = await this.props.fetchMovies()
        this.setState({
            movies: response,
            accion: response.filter( serie => serie.categories.includes( "Action" ) ),
            comedy: response.filter( serie => serie.categories.includes( "Comedy" ) ),
            adventure: response.filter( serie => serie.categories.includes( "Adventure" ) )
        })
    }

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    
    render() {
        return(
            <>
                <Header />
                <div className="seriesContainer">
                    {  this.state.movies &&
                        <Lastest title={ "Most Populars" } array={ this.state.movies} />
                    }
                </div> 
                <div className="seriesContainer">
                    {  this.state.accion &&
                        <Lastest title={ "Accion" } array={ this.state.accion} />
                    }
                </div>     
                <div className="seriesContainer">
                    {  this.state.comedy &&
                        <Lastest title={ "Comedy" } array={ this.state.comedy} />
                    }
                </div>   
                <div className="seriesContainer">
                    {  this.state.adventure &&
                        <Lastest title={ "Adventure" } array={ this.state.adventure} />
                    }
                </div>   
                <Footer />
            </>        
        )
    }
}

const mapDispatchToProps = {
    fetchMovies: audiovisualActions.movies
}

export default connect(null, mapDispatchToProps)(Movies)
