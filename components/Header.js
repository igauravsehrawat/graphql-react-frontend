import Nav from './Nav';

const Header = () => {
  return (
    <div>
      <div>
        <img src='' alt='logo' />
      </div>
      <div className="bar">
        <a href="">Dev Fits</a>
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
