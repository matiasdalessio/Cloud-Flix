const audiovisualActions = {
    movies: () => {
        return async (dispatch, getState) => {
            try {
                var response = await fetch("http://localhost:4000/api/audiovisuals")
                var data = await response.json()

                if (!data.success) {

                } else {
                    return data.respuesta.filter( movie => movie.audiovisualType === 'Movie' )
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    filterFilms: (value) => {
        return async (dispatch, getState) => {
            try {
                var response = await fetch("http://localhost:4000/api/audiovisuals")
                var data = await response.json()

                if (!data.success) {

                } else {
                    console.log(data.respuesta)
                    return  data.respuesta.filter( movie => movie.cast.includes(value) )
                }
            } catch (error) {
                console.log(error)
            }
        }
    },

}

export default audiovisualActions