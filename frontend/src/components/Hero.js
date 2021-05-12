const Hero = ()=>{
    return (
        <div className="section">
            <div className="hero-slide-item" style={{backgroundImage:'url("../images/transformer-banner.jpg")'}}>
                
                <div className="overlay"></div>
                <div className="hero-slide-item-content">
                    <div className="item-content-wraper">
                        <div className="item-content-title">
                            Transformer
                        </div>
                        <div className="movie-infos">
                            <div className="movie-info">
                                <i className="bx bxs-star"></i>
                                <span>9.5</span>
                            </div>
                            <div className="movie-info">
                                <i className="bx bxs-time"></i>
                                <span>120 mins</span>
                            </div>
                            <div className="movie-info">
                                <span>HD</span>
                            </div>
                            <div className="movie-info">
                                <span>16+</span>
                            </div>
                        </div>
                        <div className="item-content-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, possimus eius. Deserunt non odit, cum vero reprehenderit laudantium odio vitae autem quam, incidunt molestias ratione mollitia accusantium, facere ab suscipit.
                        </div>
                        <div className="item-action">
                            <p className="btn btn-hover">
                                <i className="bx bxs-right-arrow"></i>
                                <span>Watch now</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hero