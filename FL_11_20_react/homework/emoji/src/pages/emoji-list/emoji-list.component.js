import React from 'react';
import classes from './emoji-list.module.scss';
import {API} from '../../constants/api.constants';

import {EmojiPack} from '../emoji-pack';
import {LatestEmojiPack} from "../latest-emoji-pack";
import {Basket} from "../basket";

export class EmojiList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      emoji: [],
      basketItems: [],
      totalPrice: 0
    };
  }

  componentWillMount () {
    fetch(`${API}/emoji-shop`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          emoji: data.emoji
        });
      })
  };

  // Add to basket.
  addToBasket = (data) => {
    this.setState(state => {
      const basketItems = [...state.basketItems, data];
      const totalPrice = state.totalPrice + data.price;
      return {
        basketItems,
        totalPrice,
      }
    });
  };

  // Remove from basket.
  removeFromBasket = (id) => {
    this.setState(state => {
      const basketItems = state.basketItems.filter(element => element.id !== id);
      const totalPrice = basketItems.reduce((acc, val) => acc + val.price, 0);
      return {
        basketItems,
        totalPrice,
      }
    });
  };

  // Check pack in Basket.
  inBasket = (id) => !!this.state.basketItems.find(element => element.id === id);

  // Purchase message.
  purchase = () => alert('Thanks for purchase');

  render () {

    if (this.state.emoji.length === 0) {
      return <p>Loading...</p>
    }

    const latestPackNum = this.state.emoji.length - 1;
    const latestPack = this.state.emoji[latestPackNum];



    return (
      <div className={classes.MainWrapper}>
        <div className={classes.Left}>
          <LatestEmojiPack
            data={latestPack}
            onAdd={() => this.addToBasket(latestPack)}
            inBasket={this.inBasket(latestPack.id)}
          />

          <div className={classes.EmojiList}>
            {this.state.emoji.map((emoji, index) => {
              return (
                <div key={index + emoji.title}>
                  <EmojiPack
                    key={emoji.title}
                    emoji={emoji.emoji[0].char}
                    packName={emoji.title}
                    stars={emoji.stars}
                    price={emoji.price}
                    onAdd={() => this.addToBasket(emoji)}
                    inBasket={this.inBasket(emoji.id)}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className={classes.Right}>
          <Basket
            items={this.state.basketItems}
            sum={this.state.totalPrice}
            onRemove={this.removeFromBasket}
            onPurchase={this.purchase}
          />
        </div>
      </div>
    );
  }
}


