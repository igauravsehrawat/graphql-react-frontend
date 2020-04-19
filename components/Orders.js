import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { format, formatDistance } from 'date-fns';
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

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
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
            // console.log(this.props.page * perPage - perPage, { data });
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { orders } = data;
            return (
              <OrderUl>
                {orders.map(order => (
                  <OrderItemStyles key={order.id}>
                    <Link
                      href={{
                        pathname: '/order',
                        query: { id: order.id },
                      }}
                    >
                      <a>
                        <div className="order-meta">
                          <p>
                            {order.items.reduce((a, b) => a + b.quantity, 0)}
                            Items
                          </p>
                          <p>{order.items.length} Products</p>
                          <p>{formatDistance(order.createdAt, new Date())}</p>
                          <p>{formatMoney(order.total)}</p>
                        </div>
                        <div className="images">
                          {order.items.map(item => (
                            <img
                              key={item.id}
                              src={item.image}
                              alt={item.description}
                            />
                          ))}
                        </div>
                      </a>
                    </Link>
                  </OrderItemStyles>
                ))}
              </OrderUl>
            );
          }}
        </Query>
      </Center>
    );
  }
}

Order.propTypes = {
  page: PropTypes.number.isRequired,
};
