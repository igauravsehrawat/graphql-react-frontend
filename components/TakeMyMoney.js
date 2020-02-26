import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const totalItems = cart =>
  cart.reduce((tally, item) => tally + item.quantity, 0);

class TakeMyMoney extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout
            name={me.name}
            description={`Total of ${totalItems(me.cart)} items`}
            image={me.cart.item && me.cart.item.image}
            stripeKey="pk_test_3X4xxalHxsddJSFXxNt5coU3"
            currency="USD"
            email={me.email}
            amount={calcTotalPrice(me.cart)}
          >
            <p>{this.props.children}</p>
          </StripeCheckout>
        )}
      </User>
    );
  }
}

export default TakeMyMoney;
