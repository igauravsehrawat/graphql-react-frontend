import Reset from '../components/Reset';

const Sell = props => (
  <div>
    <p>The reset token is {props.query.resetToken}</p>
    <Reset resetToken={props.query.resetToken}/>
  </div>
)

export default Sell;
