import React, { Component } from 'react'
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
      item(
        where: {
          id: $id
        }
      ) {
        id

        description
        largeImage
        title
      }
    }
`

const SingleItemStyle = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${ props => props.theme.bs };
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
      {({loading, error, data}) => {
        if (error) return <Error error={error} />
        if (loading) return <p>Loading...</p>
        if (!data.item) return <p> No item found for id {this.props.id}</p>
        return <SingleItemStyle>
          <img src={data.item.largeImage} alt={data.item.title} />
          <div className="details">
            <h2>{data.item.title}</h2>
            <p>{data.item.description}</p>
          </div>
        </SingleItemStyle>
      }}
      </Query >
    )
  }
}

export default SingleItem;
