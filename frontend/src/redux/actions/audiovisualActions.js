const audiovisualActions = {
    movies: () => {
        return async (dispatch, getState) => {
            try {
                var response = await fetch("http://localhost:4000/api/audiovisuals")
                var data = await response.json()
                console.log(data.respuesta)
                if (!data.success) {
                    console.log(data.respuesta)
                } else {
                    return data.respuesta.filter( movie => movie.audiovisualType === 'Movie' )
                }
            } catch (error) {
                console.log(data.repuesta)
            }
        }
    },
    actorFilter: (outerText) => {
        console.log(outerText)
        return(dispatch, getstate) => {
            console.log('llegué actions')
            /* dispatch({type: 'FILTRAR_ACTOR', payload: outerText}) */
        }
    },

}

export default audiovisualActions