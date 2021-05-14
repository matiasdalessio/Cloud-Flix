const audiovisualActions = {
    movies: () => {
        return async (dispatch, getState) => {
            try {
                var response = await fetch("http://localhost:4000/api/audiovisuals")
                var data = await response.json()
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
    actorFilter: (value) => {
        return(dispatch, getstate) => {
            dispatch({type: 'FILTRAR_ACTOR', payload: value})
        }
    },

}

export default audiovisualActions