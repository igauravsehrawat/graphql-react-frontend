import Link from 'next/link';
import { Mutation } from 'react-apollo';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';
import { TOGGLE_CART_MUTATION } from './Cart';
import CartCount from './CartCount';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        {me && (
          <>
            <Link href="/">{me.name}</Link>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Signup/Signin</a>
          </Link>
        )}
        <Link href="/">
          <a>Shop</a>
        </Link>
        {me && <Signout />}
        {me && (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {toggleCart => (
              <button onClick={toggleCart} type="button">
                My Cart
                <CartCount
                  count={me.cart.reduce(
                    (tally, cartItem) => tally + cartItem.quantity,
                    0
                  )}
                />
              </button>
            )}
          </Mutation>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
