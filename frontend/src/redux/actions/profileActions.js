import axios from 'axios'

const profileActions = {

    addToMyList: (movie, userLS) => {
        return async () => {
           try {
            const response = await axios.put(`http://localhost:4000/api/profile/addToList/${movie._id}`, {movie}, {
                headers: {
                'Authorization': 'Bearer '+userLS.token
                }
            })            
            return  response.data.response
            } catch {
               return alert("error")
            }
        }
    }, 
    getUserProfiles: (id, userLS) => {
        return async (dispatch, getstate) => {
           try {
            const response = await axios.get(`http://localhost:4000/api/profile/${id}`, {
                headers: {
                'Authorization': 'Bearer '+userLS.token
                }
            })            
            dispatch({
                type: "USER_PROFILES",
                payload: response.data.respuesta
                
            })
            } catch {
               return alert("error")
            }
        }
    }, 
}

export default profileActions