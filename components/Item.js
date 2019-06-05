import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link';
import ItemStyles from '../components/styles/ItemStyles';
import Title from '../components/styles/Title';
import PriceTag from '../components/styles/PriceTag';
import formatMoney from '../lib/formatMoney';
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
                </ItemStyles>
            </div>
        )
    }
}
