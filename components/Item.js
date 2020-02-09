import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link';
import ItemStyles from '../components/styles/ItemStyles';
import Title from '../components/styles/Title';
import PriceTag from '../components/styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import DeleteItem from './DeleteItem';
export default class Item extends Component {
    static propTypes = {
        // TODO: Do checks on item subset dictionary, id, title
        item: PropTypes.object.isRequired
    }

    render() {
        const { item: {
          id,
          image,
          title,
          price,
          description
        }} = this.props;
        return (
            <div>
                <ItemStyles>
                    {image && <img src={image} />}
                    <Title>
                        <Link
                            href={{
                                pathname: '/item',
                                query: { id: id},
                            }}>
                            <a>{title}</a>
                        </Link>
                    </Title>
                    <PriceTag>({formatMoney(price)})</PriceTag>
                    <p>{description}</p>
                  <div className="buttonList">
                      <Link
                        href={{
                          pathname: '/update',
                          query: { id: id }
                        }}>
                      <button>Edit ✏️</button>
                      </Link>
                      <AddToCart id={id} />
                      <DeleteItem id={id}>Delete this item</DeleteItem>
                  </div>
                </ItemStyles>
            </div>
        )
    }
}
