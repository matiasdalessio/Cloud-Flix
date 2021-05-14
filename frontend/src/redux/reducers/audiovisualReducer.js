const initialState = {
    movies: null
}

const audiovisualReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_MOVIES':
            return {
                ...state,
                movies: action.payload
            }
        case 'FILTER_ACTORS':
            return {
                ...state,
                movies: state.movies.filter(movie => {return movie.cast.toLowerCase().indexOf()(action.payload.toString().toLowerCase().trim()) === 0}) 
            }
        default:
            return state
    }
}

export default audiovisualReducer