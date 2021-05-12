
const seriesAction = {

    fetchSeries:()=>{
        return()=>{
           return fetch("http://localhost:4000/api/audiovisuals")
            .then( data => data.json() )
            .then( data => data.respuesta.filter( element => element.audiovisualType === "Serie" ) )
            .catch( err => console.log( err ) )
        }
    }
}

export default seriesAction