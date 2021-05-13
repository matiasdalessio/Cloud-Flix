import React from "react"
import Footer from "../components/Footer"
import { connect } from 'react-redux';
import audiovisualActions from '../redux/actions/audiovisualActions'
import Header from "../components/Header";
import Lastest from "../components/Lastest"

class Movies extends React.Component{

    state = {
        
    }

    componentDidMount = () => {
        this.props.fetchMovies()
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
                <Header/>
                {  this.movies &&
                    <Lastest title={ "Most Populars" } array={ this.movies} />
                }
                </div>   
                <Footer />
            </>        
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.audiovisual.movies.filter( movie => movie.audiovisualType === 'Movie' )
    }
}

const mapDispatchToProps = {
    fetchMovies: audiovisualActions.movies
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies)
