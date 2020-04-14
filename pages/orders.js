import PleaseSignIn from '../components/PleaseSignIn';
import Orders from '../components/Orders';

const OrdersPage = props => (
  <div>
    <PleaseSignIn>
      <Orders page={parseFloat(props.query.page) || 1} />
    </PleaseSignIn>
  </div>
);

export default OrdersPage;
