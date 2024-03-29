import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 2px solid ${props => props.theme.lightGrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
    width: 100px;
  }
  h3,
  p {
    margin: 0px;
  }
`;

const CartItem = ({ cartItem }) => {
  if (!cartItem.item)
    return (
      <CartItemStyles>
        <p>This item has been removed!!</p>
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  return (
    <CartItemStyles>
      <img alt={cartItem.item.description} src={cartItem.item.image} />
      <h3>{cartItem.item.title}</h3>
      <p>
        {formatMoney(cartItem.quantity * cartItem.item.price)}
        {' - '}
        {cartItem.quantity} &times; {formatMoney(cartItem.item.price)}
      </p>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
