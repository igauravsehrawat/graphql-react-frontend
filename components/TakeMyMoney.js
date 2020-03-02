import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import StripeCheckout from 'react-stripe-checkout';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

/**
 * mutation createOrder is used in client side
 * createOrder is what is send internally to backend
 */
const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

const totalItems = cart =>
  cart.reduce((tally, item) => tally + item.quantity, 0);

class TakeMyMoney extends Component {
  onToken = (res, createOrder) => {
    // manually call the mutation
    createOrder({
      variables: { token: res.id },
    }).catch(err => alert(err.message));
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {(createOrder, { data, error, loading }) => (
              <StripeCheckout
                name={me.name}
                description={`Total of ${totalItems(me.cart)} items`}
                image={me.cart.item && me.cart.item.image}
                stripeKey="pk_test_3X4xxalHxsddJSFXxNt5coU3"
                currency="USD"
                email={me.email}
                amount={calcTotalPrice(me.cart)}
                token={res => this.onToken(res, createOrder)}
              >
                <p>{this.props.children}</p>
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default TakeMyMoney;
