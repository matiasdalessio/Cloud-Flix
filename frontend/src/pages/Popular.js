import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Lastest from "../components/Lastest"
import Loader from "../components/Loader"
import { connect } from "react-redux"
import seriesAction from "../redux/actions/seriesAction"
import BannerRandom from "../components/BannerRandom"

class Popular extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    state={
        all:[],
        series: [],
        movies: [] ,
        action: [],
        comedy: [],
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
        item.length === 0 
        ? this.setState({ ...this.state, filtered:[] })
        : this.setState({ ...this.state, 

        filtered: this.state.all.filter( element => element.title.toLowerCase().trim().indexOf( item ) === 0 ).length > 0
        ? this.state.all.filter( element => element.title.toLowerCase().trim().indexOf( item ) === 0 )
        : false
        })
    }

    render() {

        if( !this.state.all.length ){
            return <Loader />
        }
        else{

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

                        :<div>
                            <BannerRandom array={this.state.all} />
                        <div className="popularContainer" >
                            <Lastest title={ "Most popular series" } array={ this.state.series } />
                                
                            <Lastest title={ "Most popular Movies" } array={ this.state.movies } />
                        </div>
                        </div>
                }

                    <Footer />    
                </div>        
            )
        }


        
    }
}


const mapDispatchToProps ={
    fetchAll:seriesAction.fetchAll
}

export default connect(null,mapDispatchToProps)(Popular) 
