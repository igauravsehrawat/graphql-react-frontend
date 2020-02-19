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

  render() {
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
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
