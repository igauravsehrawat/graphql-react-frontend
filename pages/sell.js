import Link from 'next/link';

const Sell = props => {
  return (
    <div>
      <p>Welcome To Sell.</p>
      <Link href="/" prefetch>
        <a>Home!!</a>
      </Link>
    </div>
  )
}

export default Sell;
