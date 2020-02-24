import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, SearchStyles, DropDownItem } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
    }
  }
`;

const routeToItem = data => {
  Router.push({
    pathname: '/item',
    query: {
      id: data.id,
    },
  });
};
class AutoComplete extends React.Component {
  state = {
    items: [],
    loading: false,
  };

  onChange = debounce(async (e, client) => {
    // Manually query apollo client
    console.log('searching...', e.target.value);
    this.setState({ loading: true });
    const response = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: {
        searchTerm: e.target.value,
      },
    });
    this.setState({
      items: response.data.items,
      loading: false,
    });
  }, 350);

  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift
          onChange={routeToItem}
          itemToString={item => (item === null ? '' : item.title)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    type="search"
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search for an item',
                      id: 'search',
                      className: this.state.loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.items.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      highlighted={index === highlightedIndex}
                      key={item.id}
                    >
                      <img src={item.image} alt={item.title} />
                      {item.title}
                    </DropDownItem>
                  ))}
                  {this.state.items.length === 0 && !this.state.loading && (
                    <DropDownItem>No item found for {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
