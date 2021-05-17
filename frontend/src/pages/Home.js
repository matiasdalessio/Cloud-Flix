import React from "react"
import Carrousel from "../components/Carrousel"
import Footer from "../components/Footer"
import Lastest from "../components/Lastest"
import seriesAction from "../redux/actions/seriesAction"
import { connect } from "react-redux"
import Header from "../components/Header"
import Loader from "../components/Loader"
import FallenServer from "../components/ServerDown"

class Home extends React.Component{
    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}
    state={
        all:[],
        series:[],
        movies:[],
        filtered:[]
    }
    componentDidMount(){
        this.props.fetchAll()
        .then( data =>{

            this.props.selectedProfile.kids 
            ? this.setState({ ...this.state, all: data.filter( element => element.audienceAge === "PG" ) })
            : this.setState({ ...this.state, all: data })

            this.state.all.length &&
            this.setState({ ...this.state,
            series: this.state.all.filter( element => element.audiovisualType === "Serie" && element.year > ( new Date().getFullYear() -3 )  ),
            movies: this.state.all.filter( element => element.audiovisualType === "Movie" && element.year > ( new Date().getFullYear() -3 )  )
            })
        })
    }

    filter = (item)=>{
        item = item.toLowerCase().trim()
        item.length === 0 
        ? this.setState({ ...this.state, filtered:[] })
        : this.setState({ ...this.state, 

        filtered: this.state.all.filter( element => element.title.toLowerCase().trim().includes( item ) ).length > 0
        ? this.state.all.filter( element => element.title.toLowerCase().trim().includes( item ) )
        : false
        })
    }

    render() {
        if ( this.props.errServer || !this.state.all ) {
            return (
                <>
                    <Header filter={this.filter} props={this.props.history}/>
                    <FallenServer />
                    <Footer />
                </>
            )
        }


        if (!this.state.all.length) {
                return <Loader/>
        }

        return(
            <div>
                <Header filter={ this.filter } props={this.props.history}/>
                {  typeof this.state.filtered === "object" && this.state.filtered.length > 0 

                    ? <div className="carouselBannerless">
                            <Lastest title={ "Results" } array={ this.state.filtered } /> 
                        </div> 

                    : !this.state.filtered

                        ?   <div className="carouselBannerless"> 
                                <div className="noResultsFounded">
                                    <h1 className="noResults">No results founded.</h1>
                                </div>
                            </div>

                        : <>
                            <Carrousel />
                            <Lastest title={'Latest Series'} array={ this.state.series} />
                            <Lastest title={'Latest Movies'} array={ this.state.movies} />
                          </>
                }
                <Footer/>
            </div>        
        )
    }
}

const mapStateToProps = state =>{
    return {
        errServer: state.audiovisual.fallenServer,
        selectedProfile: state.profile.selectedProfile
    }
}

const mapDispatchToProps ={
    fetchAll: seriesAction.fetchAll,
    fetchMovies: seriesAction.fetchMovies
}

export default connect(mapStateToProps, mapDispatchToProps) (Home)
