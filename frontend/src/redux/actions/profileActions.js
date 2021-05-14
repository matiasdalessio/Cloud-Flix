import axios from 'axios'
import swal from 'sweetalert'

const profileActions = {

    addToMyList: (sendedData, userLS, id) => {
        return async () => {
           try {
            const response = await axios.put(`http://localhost:4000/api/profile/addToList/${id}`, {sendedData}, {
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
    getMoviesOnList: (id) => {
        return async () => {
           try {
            const response = await axios.get(`http://localhost:4000/api/profiles/mylist/${id}`,)     
            return  response.data.response
            } catch {
               return alert("error")
            }
        }
    }, 
    createProfile:(newProfile, id) => {
        return async (dispatch, getstate) => {
            try {
                const respuesta = await axios.post(`http://localhost:4000/api/profile/${id}`, {newProfile})
                if (!respuesta.data.success) {
                    return respuesta.data.error
                }
                dispatch({
                    type: "SELECTED_PROFILE",
                    payload: respuesta.data.respuesta
                    
                })
                return respuesta.data.respuesta               
            }catch(error) {
                return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
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
    profileSelected: (profile) => {
        return (dispatch, getstate) => {
            dispatch({
                type: "SELECTED_PROFILE",
                payload: profile                
            })
        }
    }, 
    unselectProfile: () => {
        return(dispatch, getstate) => {
            dispatch({type: 'UNSELECT_PROFILE'})
        }
    },
}

export default profileActions