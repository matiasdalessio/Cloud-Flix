import { NavLink } from 'react-router-dom';
import CarouselMovies from "./CarouselMovies"

const Movie = (props) => {
    const { movie , array } = props

    return (
        <>
        <div className="section">
            <div className="container">
                <div className="section-header">
                    accion  
                </div>
            </div>
        </div>
        <CarouselMovies movies={ array }/>
        </>
    )
}
export default Movie