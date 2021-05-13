import React from "react"
import Footer from "../components/Footer"
import { connect } from 'react-redux';
import audiovisualActions from '../redux/actions/audiovisualActions'
import Movie from "../components/Movie";
import Header from "../components/Header";

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
                <Header />
            {
                this.props.movies.map( movie => {
                    var array =[ 
                        {
                            id: movie._id,
                            image: movie.imageURL,
                            title: movie.title
                        }
                    ]
                    return <Movie movie={movie} array={array}  />
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
