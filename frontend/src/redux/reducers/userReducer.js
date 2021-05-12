const initialState = {
    userLogged: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOG_USER': 
            localStorage.setItem('userLogged', JSON.stringify({email: action.payload.email}))
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                userLogged: action.payload
            }
        case 'LOGOUT_USER':
            localStorage.clear()
            return {
                ...state,
                userLogged: null
            }
        default:
            return state
    }
}
export default userReducer 