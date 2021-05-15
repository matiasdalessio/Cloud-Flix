import { NavLink } from "react-router-dom";

const BannerRandom = (props) => {
    const {array} = props

    let bannerRandom = Math.floor(Math.random() * (array.length));
    let selection = array[bannerRandom]


    return (
        <>
        <div className="bannerMovies" style={{ backgroundImage: `url(${selection.imageBackground})` }}>
            <div className="overlay"></div>
            <div className="hero-slide-item-content itemContent">
                <div className="item-content-wraper contentWraper">
                    <div className="item-content-title contentTitle">
                        {selection.title}
                    </div>
                    <div className="movie-infos">
                        <div className="movie-info">
                            <i className="bx bxs-star"></i>
                            <span>9.5</span>
                        </div>
                        <div className="movie-info">
                            <i className="bx bxs-time"></i>
                            <span>{selection.duration} hs</span>
                        </div>
                        <div className="movie-info">
                            <span>HD</span>
                        </div>
                        <div className="movie-info">
                            <span>{selection.audienceAge}</span>
                        </div>
                    </div>
                    <div className="item-content-description contentDescription">
                        {selection.sinopsis}
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
        
        </>
    )
}
export default BannerRandom