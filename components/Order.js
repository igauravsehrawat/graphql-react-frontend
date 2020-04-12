import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { format } from 'date-fns';
import formatMoney from '../lib/formatMoney';
import OrderStyles from './styles/OrderStyles';
import Error from './ErrorMessage';

const SINGLE_ORDER_QUERY = gql`
  query order($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        image
        price
        quantity
      }
    }
  }
`;
export default class Order extends Component {
  render() {
    return (
      <Query
        query={SINGLE_ORDER_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          const { order } = data;
          return (
            <OrderStyles>
              <Head>
                <title>Dev Fits - Order ID: {order.id}</title>
              </Head>
              <p>
                <span>Order ID:</span>
                <span>{order.id}</span>
              </p>
              <p>
                <span>Date</span>
                <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
              </p>
              <p>
                <span>Order total</span>
                <span>{formatMoney(order.total)}</span>
              </p>
              <p>
                <span>Item Count</span>
                <span>{order.items.length}</span>
              </p>
              <div className="items">
                {order.items.map(item => (
                  <div key={item.id} classNames="order-item">
                    <img src={item.image} alt={item.description} />
                    <div classNames="item-details" key={item.id}>
                      <h2>{item.title}</h2>
                      <p>Qty: {item.quantity}</p>
                      <p>Each: {item.price}</p>
                      <p>
                        Sub Total: {formatMoney(item.price * item.quantity)}
                      </p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </OrderStyles>
          );
        }}
      </Query>
    );
  }
}

Order.propTypes = {
  id: PropTypes.string.isRequired,
};

export { SINGLE_ORDER_QUERY };
