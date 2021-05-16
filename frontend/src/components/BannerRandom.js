import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { connect } from "react-redux";
import profileActions from "../redux/actions/profileActions";


const BannerRandom = (props) => {
    const {array, addToMyList, profileSelected, userLogged, selectedProfile} = props
    const [myList, setMyList] = useState({ myList: selectedProfile.myList, fetching: false })
    const [bannerRandom, setBannerRandom] = useState({ bannerRandom: [], movie: [] })
    let bannerRandomMath = Math.floor(Math.random() * (array.length));
    let movie = array[bannerRandomMath]

    useEffect(()=> {
        setBannerRandom({
            bannerRandom : bannerRandom,
            movie : movie
        })        
           // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
    

    const userData = JSON.parse(localStorage.getItem('userLogged'))
    const userLS = {
        token: localStorage.getItem('token'),
        ...userData
    }


    var movieFounded = selectedProfile.length !==0 && myList.myList.some(movieAdded => movieAdded.audiovisualId === bannerRandom.movie._id)
  
    const sendMovieToList = async(movie) =>{
    setMyList({...myList, fetching:true})
    const add = {movie, add:true}
    const remove = {movie, add:false}
    const sendedData = movieFounded ? remove : add
    const response = await addToMyList(sendedData, userLS, selectedProfile._id)
        profileSelected(response)    
        setMyList({myList: response.myList, fetching: false})
    }


    return (
        <>
        <div className="bannerMovies" style={{ backgroundImage: `url(${bannerRandom.movie.imageBackground})` }}>
            <div className="overlay"></div>
            <div className="hero-slide-item-content itemContent">
                <div className="item-content-wraper contentWraper">
                    <div className="item-content-title contentTitle">
                        {bannerRandom.movie.title}
                    </div>
                    <div className="movie-infos">
                        <div className="movie-info">
                            <i className="bx bxs-star"></i>
                            <span>9.5</span>
                        </div>
                        <div className="movie-info">
                            <i className="bx bxs-time"></i>
                            <span>{bannerRandom.movie.duration} hs</span>
                        </div>
                        <div className="movie-info">
                            <span>HD</span>
                        </div>
                        <div className="movie-info">
                            <span>{bannerRandom.movie.audienceAge}</span>
                        </div>
                    </div>
                    <div className="item-content-description contentDescription">
                        {bannerRandom.movie.sinopsis}
                    </div>
                    <div className="item-action">
                        <p className="btn btn-hover buttonBannerRandom">
                            <i className="bx bxs-right-arrow"></i>
                            <span>Watch now</span>
                        </p>
                    </div>
                    {userLogged &&   
                    <p className="btn btn-hover buttonBannerRandom " onClick={() => !myList.fetching && sendMovieToList(bannerRandom.movie)} >
                        <i><FaPlus className={movieFounded ? "addButton" : ""}/> </i>
                        <span>{movieFounded ? "Remove form list" : "Add to list"} </span>                        
                    </p>
                    } 
                </div>
            </div>
        </div>
        
        </>
    )
}


const mapStateToProps = state => {
    return {
      userLogged: state.user.userLogged,
      selectedProfile: state.profile.selectedProfile
    }
  }
  const mapDispatchToProps = {
  
    addToMyList :  profileActions.addToMyList,
    profileSelected: profileActions.profileSelected,
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(BannerRandom)
