import React, { Component } from 'react'


class CreateItem extends Component {
  state = {
    id: 'this is id',
    title: 'this is title',
    description: 'this is description',
    price: 2000,
    image: '',
    largeImage: '',
  };

  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target);
    // const { name, value } = e.target
    // this.state[name] = this.state.value;
  };
  render() {
    return (
      <div>
        <Form onSubmit={}></Form>
        <fieldset >
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
            type="text"
            value={this.state.description}
            placeholder="Enter description"
            required={true}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </fieldset>

      </div>
    )
  }
}

export default CreateItem;
