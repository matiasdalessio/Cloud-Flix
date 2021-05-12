import React from "react"
import Footer from "../components/Footer"
import { connect } from 'react-redux';
import audiovisualActions from '../redux/actions/audiovisualActions'
import Movie from "../components/Movie";

class Movies extends React.Component{

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
            {
                this.props.movies.map( movie => {
                    return <Movie movie={movie} />
                })
            }
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
