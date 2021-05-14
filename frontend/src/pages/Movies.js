import React from "react"
import Footer from "../components/Footer"
import { connect } from 'react-redux';
import audiovisualActions from '../redux/actions/audiovisualActions'
import Header from "../components/Header";
import Lastest from "../components/Lastest"
import Loader from "../components/Loader"

class Movies extends React.Component {

    state = {
        loader: true,
        movies: [],
        action: [],
        comedy: [],
        adventure: []

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

        return (
            <>
                <Header />
                <div className="bannerMovies" style={{ backgroundImage: `url(${selection.imageURL})` }}>
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
                <Footer />
            </>
        )
    }
}

const mapDispatchToProps = {
    fetchMovies: audiovisualActions.movies
}

export default connect(null, mapDispatchToProps)(Movies)
