import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import User from './User';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import DeleteItem from './DeleteItem';

export default class Item extends Component {
  static propTypes = {
    // TODO: Do checks on item subset dictionary, id, title
    item: PropTypes.object.isRequired,
  };

  render() {
    const {
      item: { id, image, title, price, description },
    } = this.props;
    return (
      <User>
        {({ data: { me } }) => (
          <ItemStyles>
            {image && <img src={image} alt={title} />}
            <Title>
              <Link
                href={{
                  pathname: '/item',
                  query: { id },
                }}
              >
                <a>{title}</a>
              </Link>
            </Title>
            <PriceTag>{formatMoney(price)}</PriceTag>
            <p>{description}</p>
            {me && (
              <div className="buttonList">
                <Link
                  href={{
                    pathname: '/update',
                    query: { id },
                  }}
                >
                  <button>Edit ✏️</button>
                </Link>
                <AddToCart id={id} />
                <DeleteItem id={id}>Delete this item</DeleteItem>
              </div>
            )}
          </ItemStyles>
        )}
      </User>
    );
  }
}
