import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Head from 'next/head';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id

      description
      largeImage
      title
    }
  }
`;

const SingleItemStyle = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  // props and not this.props because <ThemeProvider passes theme in props
  // And it is not part of component
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contains;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p> No item found for id {this.props.id}</p>;
          const { item } = data;
          return (
            <SingleItemStyle>
              <Head>
                <title>Dev Fits | {item.title}</title>
              </Head>
              <img src={item.largeImage} alt={item.title} />
              <div className="details">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemStyle>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
export { SINGLE_ITEM_QUERY };
