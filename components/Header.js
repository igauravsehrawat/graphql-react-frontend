import Nav from './Nav';
import styled from 'styled-components'
import Link from 'next/link';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-decoration: none;
  }
  @media (max-width: 1500px) {
      margin: 0;
      text-align: center;
  }
`;

const Header = () => {
  return (
    <div>
      <div>
        <img src='' alt='logo' />
      </div>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>Dev Fits</a>
          </Link>
        </Logo>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>
        <p>Cart</p>
      </div>
      <Nav />
    </div>
  );
};

export default Header;
