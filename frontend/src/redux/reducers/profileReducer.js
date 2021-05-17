const initialState = {
    userProfiles:[],
    selectedProfile:[],
    greetings: false
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
                kids: action.payload.kids,
            }))
            return {
                ...state,
                selectedProfile: action.payload,
                greetings: true
            }
        case 'UNSELECT_PROFILE':
            return {
                ...state,
                selectedProfile: []
            }
        case 'BACK_WELCOME':
            return {
                ...state,
                greetings: false
            }
        default:
            return state
    }
}
export default profileReducer 