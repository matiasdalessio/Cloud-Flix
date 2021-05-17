
const seriesAction = {

    fetchSeries:()=>{
        return(dispatch)=>{
           return fetch("http://localhost:4000/api/audiovisuals")
            .then( data => data.json() )
            .then( data => data.respuesta.filter( element => element.audiovisualType === "Serie" ) )
            .catch( err => dispatch({ type: 'ERR', payload: true }) )
        }
    },
    fetchMovies:()=>{
        return(dispatch)=>{
           return fetch("http://localhost:4000/api/audiovisuals")
            .then( data => data.json() )
            .then( data => data.respuesta.filter( element => element.audiovisualType === "Movie" ) )
            .catch( err => dispatch({ type: 'ERR', payload: true }) )
        }
    },
    fetchAll: ()=>{
        return (dispatch)=>{
            return fetch("http://localhost:4000/api/audiovisuals")
            .then( data => data.json() )
            .then( data => data.respuesta  )
            .catch( err => dispatch({ type: 'ERR', payload: true }) )
        }
    }
}

export default seriesAction

