import axios from 'axios'
import swal from 'sweetalert'

const usersActions ={
    
    newUser: (newUser) => {
        return async (dispatch, getState) => {
           try {
                const respuesta = await axios.post('http://localhost:4000/api/user/signup', newUser)
                if (!respuesta.data.success) {
                    return respuesta.data.error
                }
                dispatch({
                    type: "LOG_USER",
                    payload: respuesta.data.respuesta                    
                }) 
                return respuesta.data.respuesta            
            }catch(error) {
                return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
            } 
        }
    },
    logUser: (userLog) => {
        return async (dispatch, getState) => {
           try {
                const response = await axios.post('http://localhost:4000/api/user/login', userLog)
                if (!response.data.success) {
                    return response.data
                }
                dispatch({
                    type: "LOG_USER",
                    payload: response.data.respuesta
                    
                })
                return response.data.respuesta
            }catch(error) {
                return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
            } 
        }
    },
    userLogout: () => {
        return(dispatch, getstate) => {
            dispatch({type: 'LOGOUT_USER'})
        }
    },
    loginForcedLS: (userLS, props) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/user/loginForced', {
                headers: {
                    'Authorization': 'Bearer '+ userLS.token
                }
            })   
            dispatch({type: 'LOG_USER', payload: {
                    ...response.data.response,
                    token: userLS.token
                }})
            } catch(error) {
                if (!error.response) {
                    return null
                } else if (error.response.status && error.response.status > 399 && error.response.status < 499) {
                    swal("Invalid Token", "Please Log in again", "error")
                    dispatch({type: 'LOGOUT_USER', payload: []})
                } 
            }         
        }
    },
    selectPlan:( change)=>{
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/selectPremium',{change}, {
                    headers:{'Authorization': 'Bearer '+ localStorage.getItem("token") }
            })   
            dispatch({type: 'CHANGE_MEMBERTYPE', payload: response.data.response
                })
            } catch(error) {
                return null
            }  
        }
    } 
}

export default usersActions