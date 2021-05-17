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

            this.props.selectedProfile.kids 
            ? this.setState({ ...this.state, all: data.filter( element => element.audienceAge === "ATP" ) })
            : this.setState({ ...this.state, all: data })
            
            this.setState({ ...this.state,
                series: this.popularityCalc( this.state.all.filter( element => element.audiovisualType === "Serie"  )   )
                .sort( ( a,b ) => b.averagePopularity - a.averagePopularity ),
    
                movies: this.popularityCalc( this.state.all.filter( element => element.audiovisualType === "Movie"  ) )
                .sort( ( a,b ) => b.averagePopularity - a.averagePopularity ),
                })
        })
    }

        popularityCalc = (array)=>{
           return array.map( element =>{
            let accumulator = 0
            element.rate.map( elementInt => accumulator = accumulator + elementInt.vote )
            element.averagePopularity = accumulator / element.rate.length || 0
            return element
            })
        }

    filter = (item)=>{
        item = item.toLowerCase().trim()
        item.length === 0 
        ? this.setState({ ...this.state, filtered:[] })
        : this.setState({ ...this.state, 

        filtered: this.state.all.filter( element => element.title.toLowerCase().trim().includes( item ) ).length > 0
        ? this.state.all.filter( element => element.title.toLowerCase().trim().includes( item )  )
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

                    ? <div className="carouselBannerless">
                            <Lastest title={ "Results" } array={ this.state.filtered } /> 
                        </div> 

                    : !this.state.filtered
                        
                        ?   <div className="carouselBannerless"> 
                                <div className="noResultsFounded">
                                    <h1 className="noResults">No results founded.</h1>
                                </div>
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

const mapStateToProps = state =>{ 
    return {
        selectedProfile: state.profile.selectedProfile
    }
}


const mapDispatchToProps ={
    fetchAll:seriesAction.fetchAll
}

export default connect(mapStateToProps,mapDispatchToProps)(Popular) 
