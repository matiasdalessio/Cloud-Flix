import React from "react"
import { connect } from "react-redux"
import seriesAction from "../redux/actions/seriesAction"
import Lastest from "../components/Lastest"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import BannerRandom from "../components/BannerRandom"


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
        mostPopular: [],
        action: [],
        comedy: [],
        scienceFiction: [],
        crime: [],
        filtered: []
    }

    componentDidMount() {
        this.props.fetchSeries()
            .then(data => {
                this.setState({
                    ...this.state,
                    series: data,
                    action: data.filter(serie => serie.categories.includes("Action")),
                    comedy: data.filter(serie => serie.categories.includes("Comedy")),
                    scienceFiction: data.filter(serie => serie.categories.includes("Science Fiction")),
                    crime: data.filter(serie => serie.categories.includes("Crime"))
                })
            })
    }

    filter = (item) => {
        item.length === 0
            ? this.setState({ ...this.state, filtered: [] })
            : this.setState({
                ...this.state,

                filtered: this.state.series.filter(serie => serie.title.toLowerCase().trim().indexOf(item) === 0).length > 0
                    ? this.state.series.filter(serie => serie.title.toLowerCase().trim().indexOf(item) === 0)
                    : false
            })
    }

    render() {
             if( !this.state.action.length ){
                return <Loader />
             }else{

                return( 
                <>
                <Header filter={ this.filter } />
                <div >
                        
                    {  typeof this.state.filtered === "object" && this.state.filtered.length > 0 
                            
                        ? <Lastest title={ "Resutls" } array={ this.state.filtered } />

                        : !this.state.filtered 
                        
                            ?  <div className="noResults">
                                     <h1>There are no results</h1>
                                </div>

                            :
                            <>
                                <BannerRandom array={this.state.series} />
                                <div className="seriesContainer" >
                                    <Lastest title={"Action"} array={this.state.action} />

                                    <Lastest title={"Comedy"} array={this.state.comedy} />

                                    <Lastest title={"Science Fiction"} array={this.state.scienceFiction} />

                                    <Lastest title={"Crime"} array={this.state.crime} />
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

const mapDispatchToProps = {
    fetchSeries: seriesAction.fetchSeries
}


export default connect(null, mapDispatchToProps)(Series)
