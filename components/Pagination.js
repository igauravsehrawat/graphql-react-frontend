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
      if (error) return <Error error={error} />;
      console.log({ data });
      const { count } = data.itemsConnection.aggregate;
      const totalPages = Math.ceil(count / perPage);
      const { page, whichPage } = props;
      if (loading) return <p>Loading...</p>;
      return (
        <PaginationStyles>
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
            {page} of {totalPages}
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
