import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import audiovisualActions from "../redux/actions/audiovisualActions"
import Footer from "./Footer"
import Header from "./Header"
import Lastest from "../components/Lastest"
import Loader from "./Loader"

const ActorFilms = (props) => {
    var actorName = props.match.params.name    
    const [actorMovies, setActorMovies] = useState([])
    const [ filtered, setFiltered ] = useState([])

    const toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    useEffect(()=> {
        var fecthearActor = async ()=>{
            let res = await props.filterFilms(actorName)
            setActorMovies(res)
        }
        fecthearActor()  
        toTop()  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[actorName])


    const filter = (item) => {
        item.length === 0
            ? setFiltered([])
            : setFiltered(
                actorMovies.filter(serie => serie.title.toLowerCase().trim().includes(item) ).length > 0
                ? actorMovies.filter(serie => serie.title.toLowerCase().trim().includes(item) )
                : false
            )
    }



    if (actorMovies.length === 0) {
        return <Loader/>
    } else {
    return(
        <div>
            <Header filter={ filter } />

            {  typeof filtered === "object" && filtered.length > 0

                ? <div className="carouselBannerless">
                    <Lastest title={ "Results" } array={ filtered } /> 
                  </div> 
                
                : !filtered

                    ? <div className="carouselBannerless"> 
                        <div className="noResultsFounded">
                           <h1 className="noResults">No results founded.</h1>
                        </div>
                      </div>

                    :  <div className="carouselBannerless">    
                            {actorMovies.length !== 0 && <Lastest title={`Films of: ${actorName}`} array={actorMovies}/>}
                        </div>

            }

            <Footer/>
        </div>        
    )
}


}

const mapStateToProps = (state) =>{
    return{
        moviesList: state.audiovisual.movies
    }    
} 
const mapDispatchToProps = {
    filterFilms: audiovisualActions.filterFilms
}

export default connect(mapStateToProps, mapDispatchToProps) (ActorFilms)  

