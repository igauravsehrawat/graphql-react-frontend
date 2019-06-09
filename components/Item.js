import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link';
import ItemStyles from '../components/styles/ItemStyles';
import Title from '../components/styles/Title';
import PriceTag from '../components/styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
export default class Item extends Component {
    static propTypes = {
        // TODO: Do checks on item subset dictionary, id, title
        item: PropTypes.object.isRequired
    }

    render() {
        const { item } = this.props;
        return (
            <div>
                <ItemStyles>
                    {item.image && <img src={item.image} />}
                    <Title>
                        <Link
                            href={{
                                pathname: '/items',
                                query: { id: item.id},
                            }}>
                            <a>{item.title}</a>
                        </Link>
                    </Title>
                    <PriceTag>({formatMoney(item.price)})</PriceTag>
                    <p>{item.description}</p>
                  <div className="buttonList">
                      <Link
                        href={{
                          pathname: '/update',
                          query: { id: item.id }
                        }}>
                      <button>Edit ✏️</button>
                      </Link>
                      <button>Add To Cart🛒</button>
                      <DeleteItem id={item.id}>Delete this item</DeleteItem>
                  </div>
                </ItemStyles>
            </div>
        )
    }
}
