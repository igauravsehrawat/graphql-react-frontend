import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  border: 0;
  background: none;
  &:hover {
    color: ${props => props.theme.red}
    cursor: pointer
  }
`;

export default class RemoveFromCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  /**
   *
   * @param {*} cache apollo cache
   * @param {*} payload server response
   */
  update = (cache, payload) => {
    // read cache
    // delete the item
    // update the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    if (data && !data.me) return null;
    data.me.cart = data.me.cart.filter(
      cartItem => cartItem !== payload.removeFromCart.id
    );
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        update={this.update}
        optimisticResponse={{
          __type: 'Mutation',
          removeFromCart: {
            __type: 'CartItem',
            id: this.props.id,
          },
        }}
      >
        {(removeFromCart, { data, error, loading }) => (
          <BigButton
            onClick={() => {
              removeFromCart({
                variables: {
                  id: this.props.id,
                },
              }).catch(err => alert(err.message + this.props.id));
            }}
          >
            &times;
          </BigButton>
        )}
      </Mutation>
    );
  }
}
