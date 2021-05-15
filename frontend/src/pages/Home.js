import React from "react"
import Carrousel from "../components/Carrousel"
import Footer from "../components/Footer"
import Lastest from "../components/Lastest"
import seriesAction from "../redux/actions/seriesAction"
import { connect } from "react-redux"
import Header from "../components/Header"
import Loader from "../components/Loader"


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
        this.setState({ ...this.state,
            all: data,
            series: data.filter( element => element.audiovisualType === "Serie"  ),
            movies: data.filter( element => element.audiovisualType === "Movie"  )
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
        if (this.state.all.length === 0) {
                return <Loader/>
        } 

        return(
            <div>
                <Header filter={ this.filter } />
                {  typeof this.state.filtered === "object" && this.state.filtered.length > 0 

                    ? <Lastest title={ "Resutls" } array={ this.state.filtered } />

                    : !this.state.filtered

                        ? <div className="noResults">
                            <h1>There are no results</h1>
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
const mapDispatchToProps ={
    fetchAll: seriesAction.fetchAll,
}

export default connect(null, mapDispatchToProps) (Home)
