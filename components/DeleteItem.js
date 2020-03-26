import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  onUpdate = (cache, payload) => {
    // 1. Read cache
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 2. Filter cache
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // 3. Write cache
    console.log(data);
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.onUpdate}
      >
        {(deleteItem, { loading, error }) => {
          {
            error && alert(error.message);
          }
          return (
            <button
              onClick={e => {
                if (confirm('Are you sure?')) {
                  deleteItem();
                }
              }}
            >
              {this.props.children}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteItem;
