import React from 'react';
import Link from 'next/link';

const Nav = () => {
  return (
    <div>
      <Link href="/" prefetch>
        <a>Home!!</a>
      </Link>
      <Link href="/sell" prefetch>
        <a>Sell!!</a>
      </Link>
    </div>
  );
};

export default Nav;
