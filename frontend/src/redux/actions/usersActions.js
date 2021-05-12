import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

const usersActions ={
    loadUser: (newUser) => {
        return async (dispatch, getstate) => {
            const response = await axios.post('http://localhost:4000/api/user/signup', newUser)
            if(response.data.success){
            dispatch({
                type: 'LOG_USER',
                payload: response.data.success ? response.data.respuesta : null 
            })
            } else {
                response.data.errores.details.map((error)=>{ 
                    alert(error.message)
                })
            }       
        } 
    },
    userLogged: (userLog) => {
        return async (dispatch, getstate) => {
            const response = await axios.post('http://localhost:4000/api/user/signin', userLog)
            if(response.data.success){
                dispatch({
                    type: 'LOG_USER', 
                    payload: response.data.respuesta})
            } else {
                alert(response.data.error)              
            }            
       }
    },
    userLogout: () => {
        return(dispatch, getstate) => {
            dispatch({type: 'SIGNOUT_USER'})
        }
    },
    loginForcedLS: (userLS) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/user/signinForzado', {
                headers: {
                    'Authorization': 'Bearer '+ userLS.token
                }
            })    
            dispatch({type: 'LOG_USER', payload: {
                    ...response.data.respuesta,
                    token: userLS.token
                }})
            } catch(err) {                
                if (err.respuesta === 401) {
                    localStorage.clear()
                }
            }           
        }
    }
}

export default usersActions