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
                movies: console.log('llegue reducer')/* state.movies.filter(movie => {return movie.cast == action.payload})  */
            }
        default:
            return state
    }
}

export default audiovisualReducer