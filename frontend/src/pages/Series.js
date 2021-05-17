import React from "react"
import { connect } from "react-redux"
import seriesAction from "../redux/actions/seriesAction"
import Lastest from "../components/Lastest"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import BannerRandom from "../components/BannerRandom"
import FallenServer from "../components/ServerDown"

class Series extends React.Component {


    toTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    state = {
        series: [],
        action: [],
        comedy: [],
        scienceFiction: [],
        crime: [],
        filtered: []
    }

    componentDidMount() {
        this.props.fetchSeries()
            .then(data => {

            this.props.selectedProfile.kids 
            ? this.setState({ ...this.state, series: data.filter( element => element.audienceAge === "PG" ) })
            : this.setState({ ...this.state, series: data })

            this.state.series.length &&
            this.setState({
                ...this.state,
                action: this.state.series.filter(serie => serie.categories.includes("Action")  ),
                comedy: this.state.series.filter(serie => serie.categories.includes("Comedy") ),
                scienceFiction: this.state.series.filter(serie => serie.categories.includes("Science Fiction") ),
                crime: this.state.series.filter(serie => serie.categories.includes("Crime") )
            })
        })
    }

    filter = (item) => {
        item = item.toLowerCase().trim()
        item.length === 0
            ? this.setState({ ...this.state, filtered: [] })
            : this.setState({...this.state,

                filtered: this.state.series.filter(serie => serie.title.toLowerCase().trim().includes(item) ).length > 0
                    ? this.state.series.filter(serie => serie.title.toLowerCase().trim().includes(item) )
                    : false
            })
    }

    render() {
        if ( this.props.errServer || !this.state.series ) {
            return (
                <>
                    <Header filter={this.filter} props={this.props.history}/>
                    <FallenServer />
                    <Footer />
                </>
            )
        }

             if( !this.state.action.length ){
                return <Loader />
             }else{

                return( 
                <>
                <Header filter={ this.filter }  props={this.props.history}/>
                <div >
                        
                    {  typeof this.state.filtered === "object" && this.state.filtered.length > 0 
                            
                        ? <div className="carouselBannerless">
                                <Lastest title={ "Results" } array={ this.state.filtered } /> 
                            </div> 

                        : !this.state.filtered 
                        
                            ?  <div className="carouselBannerless"> 
                                    <div className="noResultsFounded">
                                        <h1 className="noResults">No results founded.</h1>
                                     </div>
                                </div>
                            :
                            <>
                                <BannerRandom array={this.state.series} />
                                <div className="seriesContainer" >
                                    <Lastest title={"Action"} array={this.state.action} />

                                    <Lastest title={"Comedy"} array={this.state.comedy} />

                                    <Lastest title={"Science Fiction"} array={this.state.scienceFiction} />
                                    
                                    { this.state.crime.length && <Lastest title={"Crime"} array={this.state.crime} /> }
                                    
                                </div>
                            </>
                    }
                    <Footer />
                </div>
                </>
            )

        }

    }
}

const mapStateToprops = state =>{
    return{
        errServer: state.audiovisual.fallenServer,
        selectedProfile: state.profile.selectedProfile
    }
}

const mapDispatchToProps = {
    fetchSeries: seriesAction.fetchSeries,
}

export default connect(mapStateToprops, mapDispatchToProps)(Series)
