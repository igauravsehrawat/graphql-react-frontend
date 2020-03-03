import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import CartStyles from './styles/CartStyles';
import SickButton from './styles/SickButton';
import User from './User';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import TakeMyMoney from './TakeMyMoney';

export const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation toggleCart {
    toggleCart @client {
      cartOpen
    }
  }
`;

// let's use react adopt for render prop mess
/* eslint-disable */
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});
/* eslint-enable */

export default class Cart extends Component {
  render(props) {
    return (
      <Composed>
        {({ user, toggleCart, localState }) => {
          const { me } = user.data;
          if (!me) return null;
          return (
            <CartStyles open={localState.data.cartOpen}>
              <header>
                <CloseButton title="close" onClick={toggleCart}>
                  &times;
                </CloseButton>
                <Supreme>{me.name}'s Cart</Supreme>
                <p>
                  You have {me.cart.length} item {me.cart.length > 1 && 's'} in
                  your cart.
                </p>
                <ul>
                  {me.cart.map(cartItem => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                  ))}
                </ul>
              </header>
              <footer>
                <p>Your total is {formatMoney(calcTotalPrice(me.cart))}</p>
                {me.cart.length && (
                  <TakeMyMoney>
                    <SickButton>Checkout</SickButton>
                  </TakeMyMoney>
                )}
              </footer>
            </CartStyles>
          );
        }}
      </Composed>
    );
  }
}
