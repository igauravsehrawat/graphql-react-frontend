import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import CartStyles from './styles/CartStyles';
import SickButton from './styles/SickButton';

export const LOCAL_STATE_QUERY  = gql`
  query getCartState {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation toggleCart {
  }
`;

export default class Cart extends Component {
  render(props) {
    return <Query query={LOCAL_STATE_QUERY}>
      {({data, loading, error}) => {
        {console.log('data is...', data)};
        return <CartStyles open={data.cartOpen}>
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
    }}
    </Query>

  }
}
