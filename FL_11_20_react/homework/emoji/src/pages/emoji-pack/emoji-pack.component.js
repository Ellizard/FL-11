import React from 'react';
import PropTypes from 'prop-types';
import classes from './emoj-pack.module.scss';

export function EmojiPack(props) {

  const drawStarsHandler = (number) => {
    let starsCount = +number;
    let starSymbol = '\u2B50';
    let starString = '';
    for (let i=0; i<starsCount; i++) {
      starString+= starSymbol;
    }
    return starString;
  };

  return (
    <div className={classes.Item}>
      <div className={classes.Icon}>{ props.emoji }</div>
      <div className={classes.Name}>{ props.packName }</div>
      <div className={classes.Stars}>{ drawStarsHandler(props.stars) }</div>
      <button disabled={props.inBasket} onClick={props.onAdd}>
        Get ({props.price}$)
      </button>
    </div>
  )

}

EmojiPack.propTypes = {
  inBasket: PropTypes.bool,
  emoji: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  packName: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};