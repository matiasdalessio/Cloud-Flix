import React from 'react';
import IconCross from './../Icons/IconCross';
import './Content.scss';
import Rating from "react-rating"
import { FaPlayCircle, FaPlus ,FaRegStar, FaStar } from "react-icons/fa"
import { connect } from "react-redux"


const Content = ({ movie, onClose, userLogged , history }) => (
          <div className="content">
              <div className="content__background">
                <div className="content__background__shadow" />
                <div
                  className="content__background__image"
                  style={{ backgroundImage: `url(${movie.imageURL})` }}
                />
              </div>
              <div className="content__area">
                <div className="content__area__container">
                  <div className="content__title">{movie.title}</div>

                  <div className="content-info" >
                    { console.log({ movie })  }

                    <div className="content__description">
                      { movie.sinopsis.length > 250 
                      ? movie.sinopsis.slice( 0 , 249 ) + "..." 
                      : movie.sinopsis } 
                    </div>

                     <h4>Age: { movie.audienceAge }</h4>

                    <div className="languages">
                    <h4>Languages: </h4>
                     { movie.availableLanguages.map( (element, index) => <span key={index}>{ element }</span> ) }
                    </div>
                     
                    <div className="subtitles">
                    <h4>Subtitles: </h4>
                     { movie.availableLanguages.map( (element, index) => <span key={index}>{ element }</span> ) }
                    </div>

                    <div className="casting">
                    <h4>Casting: </h4>
                     { movie.cast.map( (element, index) => <span key={index}>{ element }</span> ) }
                    </div>

                    <div className="director">
                    <h4>Director: { movie.director } </h4>
                    </div>

                    <div className="year">
                    <h4>Year: { movie.year } </h4>
                    </div>
                  </div>

                  <div className="buttons">
                    <button className="btn-borde" onClick={ ()=> history.push("/audiovisual"+ movie._id )  }  >
                      Play<FaPlayCircle size={ 20 } /></button>
                    <button className="favourite" ><FaPlus /> </button>

                    <Rating initialRating={ 0 } readonly={ !userLogged ? true : false  }
                      emptySymbol={ <FaRegStar /> }
                      fullSymbol={ <FaStar /> }
                      fractions={ 2 }
                    />
                  </div>

                </div>
                <button className="content__close" onClick={onClose}>
                  <IconCross />
                </button>
              </div>
            </div>
  
);

const mapStateToProps = state =>{
  return{
    userLogged: state.user.userLogged
  }
}


export default connect(mapStateToProps,null)(Content);
