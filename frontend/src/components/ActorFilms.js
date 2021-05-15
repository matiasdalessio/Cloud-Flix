import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import audiovisualActions from "../redux/actions/audiovisualActions"
import Footer from "./Footer"
import Header from "./Header"
import Lastest from "../components/Lastest"

const ActorFilms = (props) => {
    var actorName = props.match.params.name    
    const [actorMovies, setActorMovies] = useState([])

    useEffect(()=> {
        var fecthearActor = async ()=>{
            let res = await props.filterFilms(actorName)
            setActorMovies(res)
        }
        fecthearActor()    
    },[actorName])

    return(
        
        <div>
            <Header />
            <h2>Films of: {actorName}</h2>
            <div>
                {actorMovies.length !== 0 && <Lastest title={'result'} array={actorMovies}/>}
            </div>
            <Footer/>
        </div>        
    )
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
