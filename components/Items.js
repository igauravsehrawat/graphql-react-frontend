import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($orderBy: ItemOrderByInput = createdAt_DESC, $skip: Int = 0 , $first: Int = ${perPage}) {
        items(
          orderBy: $orderBy,
          skip: $skip,
          first: $first,
        ) {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;
const Center = styled.div`
  text-align: center;
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} whichPage="items" />
        <Query
          query={ALL_ITEMS_QUERY}
          variables={{
            skip: this.props.page * perPage - perPage,
          }}
        >
          {({ data, error, loading }) => {
            // console.log(this.props.page * perPage - perPage, { data });
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ItemList>
                {data.items.map(item => (
                  <Item item={item} key={item.id} />
                ))}
              </ItemList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
        <p>
          Inspired by <a href="https://wesbos.com/">Wes Bos</a>
        </p>
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };
