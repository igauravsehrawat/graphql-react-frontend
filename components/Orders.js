import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { format } from 'date-fns';
import styled from 'styled-components';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';
import Error from './ErrorMessage';
import Pagination from './Pagination';
import { perPage } from '../config';

const Center = styled.div`
  text-align: center;
`;

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY($orderBy: OrderOrderByInput = createdAt_DESC, $skip: Int = 0 , $first: Int = ${perPage}) {
    orders(orderBy: $orderBy, skip: $skip, first: $first) {
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
      <Center>
        <Query
          query={USER_ORDERS_QUERY}
          variables={{
            skip: this.props.page * perPage - perPage,
          }}
        >
          {({ data, error, loading }) => {
            console.log(this.props.page * perPage - perPage, { data });
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { orders } = data;
            return (
              <OrderItemStyles>
                {orders.map(order => (
                  <div key={order.id}>
                    <p>
                      <span>Order ID:</span>
                      <span>{order.id}</span>
                    </p>
                    <p>
                      <span>Date</span>
                      <span>
                        {format(order.createdAt, 'MMMM d, YYYY h:mm a')}
                      </span>
                    </p>
                    <p>
                      <span>Order total</span>
                      <span>{formatMoney(order.total)}</span>
                    </p>
                    <p>
                      <span>Item Count</span>
                      <span>{order.items.length}</span>
                    </p>
                  </div>
                ))}
              </OrderItemStyles>
            );
          }}
        </Query>
      </Center>
    );
  }
}

Order.propTypes = {
  id: PropTypes.string.isRequired,
};
