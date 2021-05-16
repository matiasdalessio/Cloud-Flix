import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import profileActions from '../../redux/actions/profileActions';
import IconCross from './../Icons/IconCross';
import './Content.scss';
import Rating from "react-rating"
import audiovisualActions from '../../redux/actions/audiovisualActions';
import {  NavLink } from 'react-router-dom';
import { FaPlayCircle, FaPlus ,FaRegStar, FaStar } from "react-icons/fa"
import { ToastContainer, toast } from 'react-toastify';


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
      setMyList({myList: response.myList, fetching: false})
      profileSelected(response)
    
  }

  const valor = (num) => {
    if( !userLogged ){
      toast("You must be logged to score",{ type:"error", position:"bottom-right" })
      return null
    }
    
    rateMovie( movie._id, userLS, num)
  }

  const rateNum = movie.rate.map(rate => rate.vote)
  const rate = rateNum.length === 0 ? 0 : rateNum.reduce((a, b) => a + b)
  const totalRate = rateNum.length === 0 ? 0 : (rate / rateNum.length).toFixed(2)
  const porcentRate = rateNum.length === 0 ? 0 : Math.ceil( rate  / rateNum.length )

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
                      { movie.sinopsis.length > 250 
                      ? movie.sinopsis.slice( 0 , 228 ) + "..." 
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
                        <span>{totalRate}</span>
                      </div>
                      <div className="movie-info">
                        <span>{movie.audienceAge}</span>
                      </div>
                  </div>
                        
                  <div className="buttons">
                    <NavLink to="/video">
                    <p className="btn btn-hover buttonBanner" /*onClick={ ()=> history.push("/audiovisual"+ movie._id )  }*/>
                      <i className='circulePlay'><FaPlayCircle size={ 20 } /></i>
                      <span>Watch now</span>
                    </p>
                    </NavLink>                    
                    <Rating onClick={valor} initialRating={porcentRate} readonly={!userLogged ? true : false}
                      emptySymbol={<FaRegStar />}
                      fullSymbol={<FaStar />}
                      fractions={1}
                    />
                     <ToastContainer />
                  </div>
                  {userLogged && 
                   <>  
                    <p className="btn btn-hover buttonBanner" onClick={() => !myList.fetching && sendMovieToList(movie)} >
                        <i><FaPlus className={movieFounded ? "addButton" : ""}/> </i>
                        <span>{movieFounded ? "Remove form list" : "Add to list"} </span>                        
                    </p>
                    <NavLink to={`/audiovisual/${movie._id}`}>Go</NavLink>
                    </>
                    }               
                </div>
                <button className="content__close" onClick={onClose}>
                  <IconCross />
                </button>
              </div>
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

