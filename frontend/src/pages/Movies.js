import React from "react"
import Footer from "../components/Footer"
import { connect } from 'react-redux';
import audiovisualActions from '../redux/actions/audiovisualActions'
import Header from "../components/Header";
import Lastest from "../components/Lastest"
import Loader from "../components/Loader"
import { Link } from "react-router-dom";

class Movies extends React.Component {

    state = {
        loader: true,
        movies: [],
        action: [],
        comedy: [],
        adventure: [],
        filtered:[]
    }

    componentDidMount = async () => {
        var response = await this.props.fetchMovies()
        this.setState({
            loader: false,
            movies: response,
            action: response.filter(serie => serie.categories.includes("Action")),
            comedy: response.filter(serie => serie.categories.includes("Comedy")),
            adventure: response.filter(serie => serie.categories.includes("Adventure"))
        })
    }

    toTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }


    filter = (item)=>{
        item.length === 0 
        ? this.setState({ ...this.state, filtered:[] })
        : this.setState({ ...this.state, 

        filtered: this.state.movies.filter( movie => movie.title.toLowerCase().trim().indexOf( item ) === 0 ).length > 0
        ? this.state.movies.filter( movie => movie.title.toLowerCase().trim().indexOf( item ) === 0 )
        : false
        })
        
    }

    render() {
        let bannerRandom = Math.floor(Math.random() * (this.state.movies.length));
        let selection = this.state.movies[bannerRandom]

        // selection.rate.map( rate => console.log(rate) )

        var titles = [
            { name: "Most Populars", movies: this.state.movies },
            { name: "Action", movies: this.state.action },
            { name: "Comedy", movies: this.state.comedy },
            { name: "Adventure", movies: this.state.adventure }
        ]

        if (this.state.loader) {
                return <Loader />
            }
            else{
                    return (
                        <>
                            <Header filter={ this.filter } />

                            {   typeof this.state.filtered === "object" && this.state.filtered.length > 0 

                                ? this.state.filtered.map( element =>{ 
                                    return <div className="results" key={ element._id } style={{  backgroundImage:`url('${ element.imageBanner }')` }} >
                                    </div> 
                                    })

                                : !this.state.filtered 
                                 
                                    ? <div className="noResults">
                                         <h1>There are no results</h1>
                                      </div>

                                    :   <>
                                            <div className="bannerMovies" style={{ backgroundImage: `url(${selection.imageBackground})` }}>
                                                <div className="overlay"></div>
                                                    <div className="hero-slide-item-content itemContent">
                                                        <div className="item-content-wraper contentWraper">
                                                            <div className="item-content-title contentTitle">
                                                                {selection.title}
                                                            </div>
                                                            <div className="movie-infos">
                                                                <div className="movie-info">
                                                                    <i className="bx bxs-star"></i>
                                                                    <span>9.5</span>
                                                                </div>
                                                                <div className="movie-info">
                                                                    <i className="bx bxs-time"></i>
                                                                    <span>{selection.duration} hs</span>
                                                                </div>
                                                                <div className="movie-info">
                                                                    <span>HD</span>
                                                                </div>
                                                                <div className="movie-info">
                                                                    <span>{selection.audienceAge}</span>
                                                                </div>
                                                            </div>
                                                            <div className="movie-cast">
                                                                <p>Cast: </p>
                                                                {selection.cast.map(actor => {          
                                                                return( 
                                                                    <>
                                                                    {console.log(actor)}
                                                                    <Link to={'/actorFilms/'+ actor} className="cast-link">{actor} </ Link>
                                                                    </>
                                                                    )
                                                                    })
                                                                    
                                                                }
                                                            </div>
                                                                <div className="item-content-description contentDescription">
                                                                    {selection.sinopsis}
                                                                </div>
                                                                <div className="item-action">
                                                                    <p className="btn btn-hover">
                                                                        <i className="bx bxs-right-arrow"></i>
                                                                        <span>Watch now</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="seriesContainer">
                                                    {
                                                        titles.map((title, index) => {
                                                            return <Lastest key={index} title={title.name} array={title.movies} />
                                                        })
                                                     }
                                                    </div>
                                        </>
                            }
                            <Footer />
                        </>
                    )
            } 

    }
}


const mapDispatchToProps = {
    fetchMovies: audiovisualActions.movies,
    actorFilter: audiovisualActions.actorFilter
}

export default connect(null, mapDispatchToProps)(Movies)
