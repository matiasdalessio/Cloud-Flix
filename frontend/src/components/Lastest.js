import CarouselMovies from "./CarouselMovies"

const ViewMovies = ({ title, array })=>{
  console.log( array )
  if( !array ){
    return
  }
    return (
        <>
        <div className="section">
          <div className="container">
              <div className="section-header">
                  { title }  
              </div>
          </div>
      </div>
      { array.length &&
        <CarouselMovies movies={ array }/>
      }
      </>
    )
}
export default ViewMovies