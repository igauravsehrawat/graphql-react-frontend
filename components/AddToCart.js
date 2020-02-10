import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id,
      quantity,
    }
  }
`

export default class AddToCart extends Component {
  render(props) {
    const { id } = this.props;
    return <Mutation mutation={ADD_TO_CART_MUTATION} variables={{
      id}}>
      {(addToCart, {loading}) => {
        return <button onClick={addToCart} disabled={loading}>Add To Cart 🛒</button>
      }}
    </Mutation>
  }

}
