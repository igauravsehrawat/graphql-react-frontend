import Items from '../components/Items';

const Home = props => {
  return (
    <div>
      <Items page={props.query.page || 1} />
    </div>
  )
}

export default Home;
