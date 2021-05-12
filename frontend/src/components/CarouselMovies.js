import Slider from './NetflixSlider'



const CarouselMovies = ({movies})=>{
    return (
        <Slider>
          {movies.map(movie => (
            <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
          ))}
        </Slider> 
    );
  
}

export default CarouselMovies;
