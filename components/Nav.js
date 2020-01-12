import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from '../components/User';

import Signout from '../components/Signout';

const Nav = () => (

    <User>
      {({data: { me }}) => (
      <NavStyles>
        {me && (
          <>
            <p>{me.name}</p>
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
        <Signout/>
      </NavStyles>
    )}
    </User>
);

export default Nav;
