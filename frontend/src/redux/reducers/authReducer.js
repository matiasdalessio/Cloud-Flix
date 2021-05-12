const initialState={
    userLogged: null 
}

const authReducer = ( state = initialState , action ) =>{

    switch (action.type) {
        case "SIGNUP":
            return state
            break;
    
        default: return state
    }
}

export default authReducer