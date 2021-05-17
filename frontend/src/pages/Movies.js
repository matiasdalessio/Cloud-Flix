import React from "react"
import Footer from "../components/Footer"
import { connect } from 'react-redux';
import audiovisualActions from '../redux/actions/audiovisualActions'
import Header from "../components/Header";
import Lastest from "../components/Lastest"
import Loader from "../components/Loader"
import BannerRandom from "../components/BannerRandom";
import FallenServer from "../components/ServerDown";
import seriesAction from "../redux/actions/seriesAction"

class Movies extends React.Component {

    state = {
        loader: true,
        movies: [],
        action: [],
        comedy: [],
        adventure: [],
        filtered: [],
        cast: []
    }

    componentDidMount = async () => {
        var response = await this.props.fetchMovies()

        this.props.selectedProfile.kids 
        ? this.setState({ ...this.state, loader: false, movies:response.filter( element => element.audienceAge === "PG" ) })
        :this.setState({ ...this.state, loader: false, movies:response  })
        
        this.state.movies.length &&
        this.setState({
            action: this.state.movies.filter(serie => serie.categories.includes("Action")),
            comedy: this.state.movies.filter(serie => serie.categories.includes("Comedy")),
            adventure: this.state.movies.filter(serie => serie.categories.includes("Adventure"))
        })

    }

    toTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }


    filter = (item) => {
        item = item.toLowerCase().trim()
        item.length === 0
            ? this.setState({ ...this.state, filtered: [] })
            : this.setState({ ...this.state,

                filtered: this.state.movies.filter(movie => movie.title.toLowerCase().trim().indexOf(item) === 0).length > 0
                    ? this.state.movies.filter(movie => movie.title.toLowerCase().trim().indexOf(item) === 0)
                    : false
            })
    }

    render() {
        var titles = [
            { name: "Action", movies: this.state.action },
            { name: "Comedy", movies: this.state.comedy },  
            { name: "Adventure", movies: this.state.adventure }
        ]

        if ( this.props.errServer || !this.state.movies ) {
            return (
                <>
                    <Header filter={this.filter} props={this.props.history}/>
                    <FallenServer />
                    <Footer />
                </>
            )
        }

        if (this.state.loader) {
            return <Loader />
        } else {
            return (
                <>
                    <Header filter={this.filter} props={this.props.history}/>

                    {   typeof this.state.filtered === "object" && this.state.filtered.length > 0

                        ? <div className="carouselBannerless">
                            <Lastest title={"Results"} array={this.state.filtered} />
                        </div>

                        : !this.state.filtered

                            ? <div className="carouselBannerless">
                                <div className="noResultsFounded">
                                    <h1 className="noResults">No results founded.</h1>
                                </div>
                            </div>

                            : <>
                                <BannerRandom array={this.state.movies} />
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

const mapStateToProps = state => {
    return {
        errServer: state.audiovisual.fallenServer,
        selectedProfile: state.profile.selectedProfile
    }
}

const mapDispatchToProps = {
    fetchMovies: seriesAction.fetchMovies,
    actorFilter: audiovisualActions.actorFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies)
