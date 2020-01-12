import CreateItem from '../components/CreateItem';
import PleaseSignIn from '../components/PleaseSignIn';

const Sell = props => (
  <div>
    <PleaseSignIn>
      <p>Welcome To Sell.</p>
      <CreateItem />
    </PleaseSignIn>
  </div>
)

export default Sell;
