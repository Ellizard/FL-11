import React from 'react';
import PropTypes from "prop-types";
import classes from "./basket.module.scss";
export function Basket(props) {

  const renderBasket = () => {
    let itemsLength = props.items.length;
    let items;

    if (itemsLength === 0) {
      return (
        <div className={classes.Basket}>
          <h2>Basket</h2>
          <p>No items to purchase.</p>
        </div>
      );
    } else {
      return (
        <div className={classes.Basket}>
          <h2>Basket</h2>
          <ul className={classes.List}>
            {items = props.items.map((item, index) => {
              return (
                <li key={index}>
                  { item.title } - {item.price}$
                  <button onClick={() => props.onRemove(item.id)}>x</button>
                </li>
              )
            })}
          </ul>
          <button onClick={props.onPurchase}>Purchase ( { props.sum } $) </button>
        </div>
      )
    }
  };

  return renderBasket();
}

Basket.propTypes = {
  onPurchase: PropTypes.func,
  items: PropTypes.array.isRequired,
  sum: PropTypes.number.isRequired,
  onRemove: PropTypes.func,
};