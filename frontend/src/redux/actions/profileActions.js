import axios from 'axios'
import swal from 'sweetalert'

const profileActions = {

    addToMyList: (sendedData, userLS, id) => {
        return async (dispatch, getstate) => {
            try {
                const response = await axios.put(`https://cloud-flix.herokuapp.com/api/profile/addToList/${id}`, {sendedData}, {
                    headers: {
                    'Authorization': 'Bearer '+userLS.token
                    }
                })            
                dispatch({
                    type: "SELECTED_PROFILE",
                    payload: response.data.response
                    
                })
                return response.data.response               
            }catch(error) {
                return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
            } 
        }
    }, 
    getMoviesOnList: (id, props) => {
        return async () => {
           try {
            const response = await axios.get(`https://cloud-flix.herokuapp.com/api/profile/mylist/${id}`,)   
            return  response.data.response
            } catch {
               return props.push('/serverdown') 
            }
        }
    }, 
    createProfile:(newProfile, id) => {
        return async (dispatch, getstate) => {
            try {
                const respuesta = await axios.post(`https://cloud-flix.herokuapp.com/api/profile/${id}`, {newProfile})
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
    deleteProfile:( id, userLS) => {
        const userId= userLS.id
        return async (dispatch, getstate) => {
            try {
                const response = await axios.put(`https://cloud-flix.herokuapp.com/api/profile/delete/${id}`, {userId}, {
                    headers: {
                    'Authorization': 'Bearer '+userLS.token
                    }
                }) 
                dispatch({
                    type: "USER_PROFILES",
                    payload: response.data.respuesta                    
                })
                return response.data.respuesta               
            }catch(error) {
                return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
            } 
        }
    },
    getUserProfiles: (id, userLS) => {
        return async (dispatch, getstate) => {
           try {
            const response = await axios.get(`https://cloud-flix.herokuapp.com/api/profile/${id}`, {
                headers: {
                'Authorization': 'Bearer '+userLS.token
                }
            })            
            dispatch({
                type: "USER_PROFILES",
                payload: response.data.respuesta
                
            })
            } catch {
               return null
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
    backWelcome: () => {
        return(dispatch, getstate) => {
            dispatch({type: 'BACK_WELCOME'})
        }
    }
}

export default profileActions