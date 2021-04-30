import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {
    title: '',
    description: '',
    price: 0,
    image: '',
    largeImage: '',
  };

  handleChange = e => {
    // console.log(e);
    const { name, type, value } = e.target;
    // console.log({name, value, type});
    const typeValue = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: typeValue,
    });
  };

  updateItem = async (e, updateItemMutation) => {
    // prevent default
    e.preventDefault();
    // call mutation
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    // console.log('Updated with!!', { res });
  };

  handleUpload = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'af0lqrya');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dgdr0vbay/image/upload',
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
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) <p>Loading...</p>;
          if (data.item) <p>No item found!!</p>;
          // console.log({ data });
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}>
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
                      <img
                        width="200"
                        src={this.state.image}
                        alt="Upload preview"
                      />
                    )}
                    <label htmlFor="title">Title</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      defaultValue={data.item.title}
                      placeholder="Enter title"
                      required
                      onChange={this.handleChange}
                    />
                    <label htmlFor="price">Price</label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      defaultValue={data.item.price}
                      placeholder="Enter price"
                      required
                      onChange={this.handleChange}
                    />
                    <label htmlFor="description"></label>
                    <textarea
                      id="description"
                      name="description"
                      defaultValue={data.item.description}
                      placeholder="Enter description"
                      required
                      onChange={this.handleChange}
                    />
                    <button type="submit">Save Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
