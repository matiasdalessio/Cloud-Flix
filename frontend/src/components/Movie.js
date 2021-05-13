import CarouselMovies from "./CarouselMovies"

const Movie = (props) => {
    const {  array } = props

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