import React from 'react';
import IconCross from './../Icons/IconCross';
import './Content.scss';

const Content = ({ movie, onClose, history }) => (
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
                    { console.log( movie )  }

                    <div className="content__description">
                      { movie.sinopsis }
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

                </div>
                <button className="content__close" onClick={onClose}>
                  <IconCross />
                </button>
              </div>
            </div>
  
);

export default Content;
