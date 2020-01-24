import React, {Component} from 'react';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import CartStyles from './styles/CartStyles';
import SickButton from './styles/SickButton';


export default class Cart extends Component {
  render(props) {
    return <CartStyles open>
      <header>
        <CloseButton title="close">&times;</CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You have __ no of items in your cart.</p>
      </header>
      <footer>
        <p>Your total is</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </CartStyles>
  }
}
