import { NavLink } from 'react-router-dom';

const Movie = (props) => {
    const {movie} = props

    return (
        <>
            <div className="movieCard" style={{ backgroundImage: `url(${movie.imageURL})`}}>
                <h1>{movie.title}</h1>
                <NavLink to={`/audiovisual/${movie._id}`}>watch</NavLink>
            </div>
        </>
    )
}
export default Movie