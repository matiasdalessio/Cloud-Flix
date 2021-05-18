import Slider from 'infinite-react-carousel';


const Carrousel = ()=>{
    const settings =  {
        pauseOnHover: true,
        autoplay: true,
        autoplaySpeed: 5000
    };

    return (
        <div className='contenedorCarrousel'>
            <Slider {...settings}>
                <div >
                    <div className="section">
                        <div className="hero-slide-item" style={{backgroundImage:'url("../images/transformer-banner.jpg")'}}>
                            
                            <div className="overlay"></div>
                            <div className="hero-slide-item-content">
                                <div className="item-content-wraper">
                                    <div className="item-content-title">
                                        Transformers
                                    </div>
                                    <div className="movie-infos">
                                        <div className="movie-info">
                                            <i className="bx bxs-star"></i>
                                            <span>4.5</span>
                                        </div>
                                        <div className="movie-info">
                                            <i className="bx bxs-time"></i>
                                            <span>154 mins</span>
                                        </div>
                                        <div className="movie-info">
                                            <span>HD</span>
                                        </div>
                                        <div className="movie-info">
                                            <span>13+</span>
                                        </div>
                                    </div>
                                    <div className="item-content-description descriptionDisplayNone">
                                    Autobots and Decepticons are at war, with humans on the sidelines. Optimus Prime is gone. The key to saving our future lies buried in the secrets of the past, in the hidden history of Transformers on Earth.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div >
                    <div className="section">
                        <div className="hero-slide-item" style={{backgroundImage:'url("../images/wanda-banner.jpg")'}}>
                            
                            <div className="overlay"></div>
                            <div className="hero-slide-item-content">
                                <div className="item-content-wraper">
                                    <div style={{zIndex: '3'}} className="item-content-title">
                                        Wanda-Vision
                                    </div>
                                    <div className="movie-infos">
                                        <div className="movie-info">
                                            <i className="bx bxs-star"></i>
                                            <span>3.5</span>
                                        </div>
                                        <div className="movie-info">
                                            <i className="bx bxs-time"></i>
                                            <span>1 Season</span>
                                        </div>
                                        <div className="movie-info">
                                            <span>HD</span>
                                        </div>
                                        <div className="movie-info">
                                            <span>13+</span>
                                        </div>
                                    </div>
                                    <div className="item-content-description descriptionDisplayNone">
                                    Wanda Maximoff and Vision—two super-powered beings living idealized suburban lives—begin to suspect that everything is not as it seems.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <div >
                    <div className="section">
                        <div className="hero-slide-item" style={{backgroundImage:'url("../images/supergirl-banner.jpg")'}}>
                            
                            <div className="overlay"></div>
                            <div className="hero-slide-item-content">
                                <div className="item-content-wraper">
                                    <div className="item-content-title">
                                        Supergirl
                                    </div>
                                    <div className="movie-infos">
                                        <div className="movie-info">
                                            <i className="bx bxs-star"></i>
                                            <span>4.0</span>
                                        </div>
                                        <div className="movie-info">
                                            <i className="bx bxs-time"></i>
                                            <span>6 Seasons</span>
                                        </div>
                                        <div className="movie-info">
                                            <span>HD</span>
                                        </div>
                                        <div className="movie-info">
                                            <span>13+</span>
                                        </div>
                                    </div>
                                    <div className="item-content-description descriptionDisplayNone">
                                    Twenty-four-year-old Kara Zor-El, who was taken in by the Danvers family when she was 13 after being sent away from Krypton, must learn to embrace her powers after previously hiding them. The Danvers teach her to be careful with her powers, until she has to reveal them during an unexpected disaster, setting her on her journey of heroism.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div  >
                    <div className="section">
                        <div className="hero-slide-item" style={{backgroundImage:'url("../images/black-banner.png")'}}>                            
                            <div className="overlay"></div>
                            <div className="hero-slide-item-content">
                                <div className="item-content-wraper">
                                    <div className="item-content-title">
                                        Black Panther
                                    </div>
                                    <div className="movie-infos">
                                        <div className="movie-info">
                                            <i className="bx bxs-star"></i>
                                            <span>7.5</span>
                                        </div>
                                        <div className="movie-info">
                                            <i className="bx bxs-time"></i>
                                            <span>134 mins</span>
                                        </div>
                                        <div className="movie-info">
                                            <span>HD</span>
                                        </div>
                                        <div className="movie-info">
                                            <span>13+</span>
                                        </div>
                                    </div>
                                    <div className="item-content-description descriptionDisplayNone ">
                                    King T'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne by factions within his own country as well as without.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    )
}
export default Carrousel