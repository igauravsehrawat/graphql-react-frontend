import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';

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
    title: '',
    description: '',
    price: 0,
    image: '',
    largeImage: '',
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    // console.log({ name, value, type });
    const typeValue = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: typeValue,
    });
  };

  handleUpload = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'devFits');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/af0lqrya/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // prevent default
              e.preventDefault();
              // call mutation
              const res = await createItem();
              // console.log({ res });
              // change the route
              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id },
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={this.handleUpload}
              />
              {this.state.image && (
                <img width="200" src={this.state.image} alt="Upload preview" />
              )}
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={this.state.title}
                placeholder="Enter title"
                required
                onChange={this.handleChange}
              />
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                value={this.state.price}
                placeholder="Enter price"
                required
                onChange={this.handleChange}
              />
              <label htmlFor="description"></label>
              <textarea
                id="description"
                name="description"
                value={this.state.description}
                placeholder="Enter description"
                required
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
