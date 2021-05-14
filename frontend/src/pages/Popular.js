import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Lastest from "../components/Lastest"
import Loader from "../components/Loader"
import { connect } from "react-redux"
import seriesAction from "../redux/actions/seriesAction"

class Popular extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    state={
        series: [],
        movies: [] ,
        action: [],
        comedy: [],
    }

    componentDidMount(){
        this.props.fetchAll()
        .then( data =>{
        this.setState({ ...this.state,
            series: data.filter( element => element.audiovisualType === "Serie"  ),
            movies: data.filter( element => element.audiovisualType === "Movie"  )
        })
        })
    }

    render() {
         console.log({ series: this.state.series, movies:this.state.movies  })
        return(
            <div className="popularContainer" >
                <Header/>

              { !this.state.series.length 
                ? <Loader />
                : <>
                    <Lastest title={ "Most popular series" } array={ this.state.series } />

                    <Lastest title={ "Most popular Movies" } array={ this.state.movies } />
                  </>
              }      

                <Footer />    
            </div>        
        )
    }
}


const mapDispatchToProps ={
    fetchAll:seriesAction.fetchAll
}

export default connect(null,mapDispatchToProps)(Popular) 
