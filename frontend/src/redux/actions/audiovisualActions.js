import axios from 'axios'

const audiovisualActions = {
    movies: () => {
        return async (dispatch, getState) => {
            try {
                var response = await fetch("http://localhost:4000/api/audiovisuals")
                var data = await response.json()
                if (!data.success) {
                    dispatch({ type: 'ERR', payload: true })
                } else {
                    return data.respuesta
                }
            } catch (error) {
                dispatch({ type: 'ERR', payload: true })
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
                    return  data.respuesta.filter( movie => movie.cast.includes(value) )
                }
            } catch (error) {
                console.log(error)
            }
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
                    return response.data.response.rate
                }
            } catch (error) {
                console.log(error)
            }

        }
    },

    fetchSeasons: (id) => {
        return async (dispatch, getState) => {
            try {
                var response = await fetch("http://localhost:4000/api/audiovisual/season/" + id )
                var data = await response.json()
                if (!data.success) {
                    dispatch({ type: 'ERR', payload: true })
                } else {
                    return data.response
                }
            } catch (error) {
                dispatch({ type: 'ERR', payload: true })
            }
        }
    },

}

export default audiovisualActions