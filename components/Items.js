import React, { Component } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        item {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

const ItemList = styled.div`

`;

export default class Items extends Component {
    render() {
        return (
            <div>
                <p>Items</p>
                <Query query={ALL_ITEMS_QUERY}>
                {(data, error, loading) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error: {error.message}</p>
                    return <ItemList>
                        data.items.map()
                    </ItemList>
                }}
                </Query>

            </div>
        )
    }
}
