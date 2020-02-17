import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import CartStyles from './styles/CartStyles';
import SickButton from './styles/SickButton';
import { CURRENT_USER_QUERY } from './User';

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

export default class Cart extends Component {
  render(props) {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data: { me }, loading, error }) => (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {toggleCart => (
              <Query query={LOCAL_STATE_QUERY}>
                {({ data, loading, error }) => {
                  {
                    console.log('data is...', data, me);
                  }
                  return (
                    <CartStyles open={data.cartOpen}>
                      <header>
                        <CloseButton title="close" onClick={toggleCart}>
                          &times;
                        </CloseButton>
                        <Supreme>{me.name}'s Cart</Supreme>
                        <p>
                          You have {me.cart.length} item{' '}
                          {me.cart.length > 1 && 's'} in your cart.
                        </p>
                        <ul>
                          {me.cart.map(item => (
                            <li>{item.id}</li>
                          ))}
                        </ul>
                      </header>
                      <footer>
                        <p>Your total is</p>
                        <SickButton>Checkout</SickButton>
                      </footer>
                    </CartStyles>
                  );
                }}
              </Query>
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}
