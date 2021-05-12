import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Carrousel = ()=>{
    
    return (
        <div className='contenedorCarrousel'>
            <Carousel showArrows={true} stopOnHover={true} emulateTouch={true} autoFocus={true} infiniteLoop={true} showIndicators={false} showThumbs={false} showStatus={false} interval={4000} autoPlay={true} transitionTime={1000}>
                <div>
                    <img src="https://cdn.wallpapersafari.com/18/17/yfFrUq.jpg" />
                </div>
                <div>
                    <img src="https://fondosmil.com/fondo/28923.jpg" />
                    
                </div>
                <div>
                    <img src="https://images6.alphacoders.com/106/thumb-1920-1067101.png" />
                </div>
            </Carousel>
        </div>
    )
}
export default Carrousel