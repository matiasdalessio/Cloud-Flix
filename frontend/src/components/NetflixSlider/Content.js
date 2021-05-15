import React, { useState } from 'react';
import { connect } from 'react-redux';
import profileActions from '../../redux/actions/profileActions';
import IconCross from './../Icons/IconCross';
import './Content.scss';
import Rating from "react-rating"
import audiovisualActions from '../../redux/actions/audiovisualActions';
import { Link, NavLink } from 'react-router-dom';
import { FaPlayCircle, FaPlus ,FaRegStar, FaStar } from "react-icons/fa"



const Content = ({ rateMovie, movie, onClose, profileSelected,  addToMyList, selectedProfile, userLogged, history }) => {

  const [myList, setMyList] = useState({ myList: selectedProfile.myList, fetching: false })

  const userData = JSON.parse(localStorage.getItem('userLogged'))
  const userLS = {
    token: localStorage.getItem('token'),
    ...userData
  }



  var movieFounded = selectedProfile.length !==0 && myList.myList.some(movieAdded => movieAdded.audiovisualId === movie._id)
  
  const sendMovieToList = async(movie) =>{
    setMyList({...myList, fetching:true})
    const add = {movie, add:true}
    const remove = {movie, add:false}
    const sendedData = movieFounded ? remove : add
    const response = await addToMyList(sendedData, userLS, selectedProfile._id)
    console.log(response)
      setMyList({myList: response.myList, fetching: false})
      profileSelected(response)
    
  }


  const valor = (num) => {
    rateMovie( movie._id, userLS, num)
  }


  return (

    <div className="content">
      <div className="content__background">
        <div className="content__background__shadow" />
        <div
          className="content__background__image"
          style={{ backgroundImage: `url(${movie.imageBackground})` }}
        />
      </div>
      <div className="content__area">
        <div className="content__area__container">
          <div className="content__title">{movie.title}</div>
          <div className="content-info" >
            <div className="content__description">
              {movie.sinopsis.length > 250
                ? movie.sinopsis.slice(0, 249) + "..."
                : movie.sinopsis}
            </div>

            <div className="languages">
              <h4>Languages: </h4>
              {movie.availableLanguages.map((element, index) => <span key={index}>{element}</span>)}
            </div>

            <div className="subtitles">
              <h4>Subtitles: </h4>
              {movie.availableLanguages.map((element, index) => <span key={index}>{element}</span>)}
            </div>

            <div className="casting">
              <h4>Cast: </h4>
              {movie.cast.map((element, index) => <span key={index}>{element}</span>)}
            </div>

            <div className="director">
              <h4>Director: {movie.director} </h4>
            </div>

            <div className="movie-infos">
              <div className="movie-info">
                <i className="bx bxs-star"></i>
                <span>9.5</span>
              </div>

              <div className="content__area">
                <div className="content__area__container">
                  <div className="content__title">{movie.title}</div>

                  <div className="content-info" >

                    <div className="content__description">
                      { movie.sinopsis.length > 250 
                      ? movie.sinopsis.slice( 0 , 249 ) + "..." 
                      : movie.sinopsis } 
                    </div>

                    <div className="languages">
                    <h4>Languages: </h4>
                     { movie.availableLanguages.map( (element, index) => <span key={index}>{ element }</span> ) }
                    </div>
                     
                    <div className="subtitles">
                    <h4>Subtitles: </h4>
                     { movie.availableLanguages.map( (element, index) => <span key={index}>{ element }</span> ) }
                    </div>

                    <div className="casting">
                    <h4>Cast: </h4>
                     { movie.cast.map( (element, index) => <NavLink to={'/actorFilms/' + element} className='actor' key={index}>{ element }</NavLink> ) }
                    </div>

                    <div className="director">
                    <h4>Director: { movie.director } </h4>
                    </div>
                    
                    <div className="movie-infos">
                        <div className="movie-info">
                          <i className="bx bxs-star"></i>
                          <span>9.5</span>
                        </div>
                        <div className="movie-info">
                          {movie.duration && <i className="bx bxs-time"></i>}
                          <span> {movie.duration && movie.duration+ " hs"}</span>
                        </div>
                        <div className="movie-info">
                          <span>{ movie.audienceAge }</span>
                        </div>
                    </div>

                  </div>
                        
                  <div className="buttons">
                    <NavLink to="/video">
                    <p className="btn btn-hover buttonBanner" /*onClick={ ()=> history.push("/audiovisual"+ movie._id )  }*/>
                      <i className='circulePlay'><FaPlayCircle size={ 20 } /></i>
                      <span>Watch now</span>
                    </p>
                    </NavLink>                   
                    <Rating initialRating={ 3 } readonly={ !userLogged ? true : false  }
                      emptySymbol={ <FaRegStar /> }
                      fullSymbol={ <FaStar onClick={() => 3} /> }
                      fractions={ 2 }
                    />
                  </div>
                  {userLogged &&   
                    <p className="btn btn-hover buttonBanner" onClick={() => !myList.fetching && sendMovieToList(movie)} >
                        <i><FaPlus className={movieFounded ? "addButton" : ""}/> </i>
                        <span>{movieFounded ? "Remove form list" : "Add to list"} </span>                        
                    </p>
                    }               
                </div>
                <button className="content__close" onClick={onClose}>
                  <IconCross />
                </button>
              </div>
              <div className="movie-info">
                <span>{movie.audienceAge}</span>
              </div>
            </div>

          </div>
          {userLogged &&
            <div className="buttons">
              <NavLink to="/video">
                <p className="btn btn-hover" /*onClick={ ()=> history.push("/audiovisual"+ movie._id )  }*/>
                  <i className='circulePlay'><FaPlayCircle size={20} /></i>
                  <span>Watch now</span>
                </p>
              </NavLink>
              <button className="favourite" onClick={() => !myList.fetching && sendMovieToList(movie)} ><FaPlus className={movieFounded ? "addButton" : ""} /> </button>
              <Rating onClick={valor} initialRating={3} readonly={!userLogged ? true : false}
                emptySymbol={<FaRegStar />}
                fullSymbol={<FaStar />}
                fractions={1}
              />
            </div>
          }
        </div>
        <button className="content__close" onClick={onClose}>
          <IconCross />
        </button>
      </div>
    </div>

  )
};

const mapStateToProps = state => {
  return {
    userLogged: state.user.userLogged,
    selectedProfile: state.profile.selectedProfile
  }
}
const mapDispatchToProps = {

  addToMyList :  profileActions.addToMyList,
  profileSelected: profileActions.profileSelected,
  rateMovie: audiovisualActions.rateMovie
}


export default connect(mapStateToProps, mapDispatchToProps)(Content)

