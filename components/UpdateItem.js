import React, { Component } from 'react'
import Form from './styles/Form';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Router from 'next/router';
import Error from '../components/ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY(
    $id: String!
  ) {
    item(where: {
      id: $id
    }) {
      title,
      description,
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
  ) {
    updateItem(
      title: $title
      description: $description
      price: $price
    ) {
      id,
      title,
      description
      price,
    }
  }
`;

class UpdateItem extends Component {
  handleChange = (e) => {
    console.log(e);
    const { name, type, value } = e.target
    console.log({name, value, type});
    const typeValue = type==='number'? parseFloat(value): value;
    this.setState({
      [name]: typeValue
    });
  };
  updateItem = async (e, updateItemMutation) => {
      // prevent default
      e.preventDefault();
      // call mutation
      const res = await updateItemMutation();
      console.log({ res });
  }

  handleUpload = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0])
    data.append('upload_preset', 'devFits');
    const res = await fetch('https://api.cloudinary.com/v1_1/igauravsehrawat/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY}
        variables={{id: this.props.id }}
      >
      {({data, loading}) => {
        if (loading) <p>Loading...</p>
        if (data.item.length===0 ) <p>No item found!!</p>
      <Mutation mutation={UPDATE_ITEM_MUTATION} variables={data.item}>
      {( createItem, {loading, error}) => (
          <Form onSubmit={(e, updateItem) => this.state.updateItem}>
            <Error error={error}/>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={this.props.title}
                placeholder="Enter title"
                required={true}
                onChange={this.handleChange}
              />
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                defaultValue={this.props.price}
                placeholder="Enter price"
                required={true}
                onChange={this.handleChange}
              />
              <label htmlFor="description"></label>
              <textarea
                id="description"
                name="description"
                defaultValue={this.props.description}
                placeholder="Enter description"
                required={true}
                onChange={this.handleChange}
              />
              <button type="submit">Save Changes</button>
            </fieldset>
          </Form>
      )}
      </Mutation>
        }}
      </Query>
    )
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
