import Link from 'next/link';

const Home = props => {
  return (
    <div>
      <p>Welcome To Home.</p>
      <Link href="/sell" prefetch>
        <a>Sell!!</a>
      </Link>
    </div>
  )
}

export default Home;
