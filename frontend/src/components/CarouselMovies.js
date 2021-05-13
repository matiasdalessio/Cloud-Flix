import Slider from './NetflixSlider'

const CarouselMovies = ({movies})=>{
    return (
        <Slider>
          {movies.map(movie => { 
              return <Slider.Item movie={movie} key={movie._id}>item1</Slider.Item>   
          })}
        </Slider> 
      )
  
}

export default CarouselMovies;
