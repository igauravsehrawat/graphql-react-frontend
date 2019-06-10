import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Error from './ErrorMessage';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const ITEMS_CONNECTION_QUERY = gql`
  query ITEMS_CONNECTION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`

const Pagination = props => {
  return (
    <Query query={ITEMS_CONNECTION_QUERY}>
    {({data, loading, error}) => {
      if (error) return <Error error={error} />
      console.log({data});
        const count = data.itemsConnection.aggregate.count;
      const totalPages = Math.ceil(count/perPage);
      const page = props.page;
      if (loading) return <p>Loading...</p>
      return (
      <PaginationStyles>
        <Link prefetch href={{
              pathname: 'items',
              query: { page: props.page - 1 }
            }}>
          <a class="prev">◀◀ Prev</a>
        </Link>
        <p>{page} of {totalPages}</p>
        <p>Total item {data.itemsConnection.aggregate.count}</p>
        <Link prefetch href={{
            pathname: 'items',
            query: { page: props.page + 1 }
          }}>
            <a class="next">>> Next</a>
          </Link>
      </PaginationStyles>
        )
      }}
    </Query>
  )
}

export default Pagination;
