import axios from 'axios'

const usersActions ={
    loadUser: (newUser) => {
        return async (dispatch, getstate) => {
            const response = await axios.post('http://localhost:4000/api/user/signup', newUser)
            if(response.data.success){
                console.log(response.data)
            dispatch({
                type: 'LOG_USER',
                payload: response.data.success ? response.data.respuesta : null 
            })
            } else {
                response.data.errores.details.map((error)=>{ 
                   return alert(error.message)
                })
            }       
        } 
    },
    userLogged: (userLog) => {
        return async (dispatch, getstate) => {
            const response = await axios.post('http://localhost:4000/api/user/login', userLog)
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
            dispatch({type: 'LOGOUT_USER'})
        }
    },
    loginForcedLS: (userLS) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/user/loginForced', {
                headers: {
                    'Authorization': 'Bearer '+ userLS.token
                }
            })   
            console.log(response) 
            dispatch({type: 'LOG_USER', payload: {
                    ...response.data.response,
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