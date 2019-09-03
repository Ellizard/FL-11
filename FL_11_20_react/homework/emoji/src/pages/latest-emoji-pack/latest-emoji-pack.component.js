import React from 'react';
import PropTypes from "prop-types";
import classes from './latest-emoji-pack.module.scss';

export function LatestEmojiPack (props) {
  return (
    <div className={classes.LatestPack}>
        <h2>New { props.data.title }</h2>
        <h4>Includes</h4>
        <div>{ props.data.emoji.map(el => el.char) }</div>
        <button
          className={classes.Button}
          disabled={props.inBasket}
          onClick={props.onAdd}
        >Get ({props.data.price}$)</button>
      </div>
  )
}

LatestEmojiPack.propTypes = {
  title: PropTypes.string,
  onAdd: PropTypes.func,
  includedSmiles: PropTypes.string,
  price: PropTypes.number,
};