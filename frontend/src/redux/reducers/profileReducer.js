const initialState = {
    userProfiles:null,
    selectedProfile:[]
        
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case 'USER_PROFILES':
            return {
                ...state,
                userProfiles: action.payload
            }
        case 'SELECTED_PROFILE':
            localStorage.setItem('profile', JSON.stringify({
                _id: action.payload._id,
                name: action.payload.name,
                avatar: action.payload.avatar,
                myList: action.payload.myList,
                kids: action.payload.kids
            }))
            return {
                ...state,
                selectedProfile: action.payload
            }
        case 'UNSELECT_PROFILE':
            return {
                ...state,
                selectedProfile: []
            }
        default:
            return state
    }
}
export default profileReducer 