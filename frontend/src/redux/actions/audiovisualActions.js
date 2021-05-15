import axios from 'axios'

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
    actorFilter: (outerText) => {
        return(dispatch, getstate) => {
            console.log('llegué actions')
            /* dispatch({type: 'FILTRAR_ACTOR', payload: outerText}) */
        }
    },
    rateMovie: (id, info, num) => {
        return async (dispatch, getState) => {
            try {
                var response = await axios.post('http://localhost:4000/api/rate/'+ id , { numero: num }, {
                    headers: {
                        'Authorization': 'Bearer '+ info.token
                    }
                })
                if (response.data.success) {
                    console.log(response.data.response)
                }
            } catch (error) {
                console.log(error)
            }

        }
    }

}

export default audiovisualActions