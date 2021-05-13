import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import './Item.scss'

const Item = ({ movie }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.id === movie._id;

      return (
        <div onClick={() => onSelectSlide(movie)}
          ref={elementRef}
          className={cx('item', {
            'item--open': isActive,
          })}
        >
          <img src={movie.imageURL} alt="" />
          <ShowDetailsButton  />
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
