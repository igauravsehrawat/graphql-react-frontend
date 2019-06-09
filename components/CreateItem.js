import React, { Component } from 'react'
import Form from './styles/Form';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import Error from '../components/ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    id: 'this is id',
    title: 'this is title',
    description: 'this is description',
    price: 2000,
    image: 'image.jpg',
    largeImage: 'large-image.jpg',
  };

  handleChange = (e) => {
    console.log(e);
    const { name, type, value } = e.target
    console.log({name, value, type});
    const typeValue = type==='number'? parseFloat(value): value;
    this.setState({
      [name]: typeValue
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
      {( createItem, {loading, error}) => (
          <Form onSubmit={
            async e => {
              // prevent default
              e.preventDefault();
              // call mutation
              const res = await createItem();
              console.log({ res });
              // change the route
              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id }
              });
            }}
            >
            <Error error={error}/>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">Title</label>
              <input
                name="title"
                type="text"
                value={this.state.title}
                placeholder="Enter title"
                required={true}
                onChange={this.handleChange}
              />
              <label htmlFor="price">Price</label>
              <input
                name="price"
                type="number"
                value={this.state.price}
                placeholder="Enter price"
                required={true}
                onChange={this.handleChange}
              />
              <label htmlFor="description"></label>
              <textarea
                name="description"
                value={this.state.description}
                placeholder="Enter description"
                required={true}
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
      )}
      </Mutation>
    )
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
