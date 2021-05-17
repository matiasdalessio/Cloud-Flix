
const seriesAction = {

    fetchSeries:(props)=>{
        return(dispatch)=>{
           return fetch("http://localhost:4000/api/audiovisuals")
            .then( data => data.json() )
            .then( data => data.respuesta.filter( element => element.audiovisualType === "Serie" ) )
            .catch( err => props.push('/serverdown')  )
        }
    },
    fetchMovies:(props)=>{
        return(dispatch)=>{
           return fetch("http://localhost:4000/api/audiovisuals")
            .then( data => data.json() )
            .then( data => data.respuesta.filter( element => element.audiovisualType === "Movie" ) )
            .catch( err => props.push('/serverdown') )
        }
    },
    fetchAll: (props)=>{
        return (dispatch)=>{
            return fetch("http://localhost:4000/api/audiovisuals")
            .then( data => data.json() )
            .then( data => data.respuesta  )
            .catch( err => props.push('/serverdown')  )
        }
    }
}

export default seriesAction

