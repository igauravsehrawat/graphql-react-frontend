import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
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
`;

const Pagination = props => (
  <Query query={ITEMS_CONNECTION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <Error error={error} />;
      const { count } = data.itemsConnection.aggregate;
      const totalPages = Math.ceil(count / perPage);
      const { page, whichPage } = props;
      return (
        <PaginationStyles data-test="pagination">
          <Head>
            <title>
              Dev Fits -- Page {page} of {totalPages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: whichPage,
              query: { page: page - 1 },
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              ◀◀ Prev
            </a>
          </Link>
          <p>
            {page} of
            <span className="totalPages">{totalPages}</span>
          </p>
          <p>Total items {data.itemsConnection.aggregate.count}</p>
          <Link
            prefetch
            href={{
              pathname: whichPage,
              query: { page: page + 1 },
            }}
          >
            <a className="next" aria-disabled={page >= totalPages}>
              Next ▶▶
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
export { ITEMS_CONNECTION_QUERY };
