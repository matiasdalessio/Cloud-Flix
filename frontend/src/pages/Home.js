import React from "react"
import Carrousel from "../components/Carrousel"
import Footer from "../components/Footer"
import Lastest from "../components/Lastest"
import seriesAction from "../redux/actions/seriesAction"
import { connect } from "react-redux"
import Header from "../components/Header"
import ProfileSelection from "./ProfileSelection"


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
        this.props.fetchSeries()
        .then( data =>{
            this.setState({ ...this.state, all:data, series: data })
        })
        this.props.fetchMovies()
        .then( data =>{
            this.setState({ ...this.state, movies: data })
        })
    }

    filter = (item)=>{
        item.length === 0 
        ? this.setState({ ...this.state, filtered:[] })
        : this.setState({ ...this.state, 

        filtered: this.state.all.filter( element => element.title.toLowerCase().trim().indexOf( item ) === 0 ).length > 0
        ? this.state.all.filter( element => element.title.toLowerCase().trim().indexOf( item ) === 0 )
        : false
        })
    }


    render() {
        return(
            <div>
                <Header filter={ this.filter } />
                {  typeof this.state.filtered === "object" && this.state.filtered.length > 0 

                    ? this.state.filtered.map( element =>{ 
                        return <div className="results" key={ element._id } style={{  backgroundImage:`url('${ element.imageBanner }')` }} >
                        </div> 
                        })

                    : !this.state.filtered

                        ? <div className="noResults">
                            <h1>There are no results</h1>
                          </div>

                        : <>
                            <Carrousel />
                            <Lastest title={'Lastest Series'} array={ this.state.series} />
                            <Lastest title={'Lastest Movies'} array={ this.state.movies} />
                          </>
                }

                <Footer/>
            </div>        
        )
    }
}
const mapDispatchToProps ={
    fetchSeries: seriesAction.fetchSeries,
    fetchMovies: seriesAction.fetchMovies
}

export default connect(null, mapDispatchToProps) (Home)
