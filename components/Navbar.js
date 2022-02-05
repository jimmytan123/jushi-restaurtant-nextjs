import classes from './Navbar.module.css';
import Image from 'next/image';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = () => {
  const [cartIconAttention, setCartIconAttention] = useState(false);
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    setCartIconAttention(true);

    const timer = setTimeout(() => {
      setCartIconAttention(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartTotalQuantity]);

  return (
    <header className={classes.navbar}>
      <div className={classes['top-bar']}>
        <div>
          <BsFacebook />
        </div>
        <div>
          <BsInstagram />
        </div>
        <div>
          <BsTwitter />
        </div>
      </div>
      <div className={classes['logo-box']}>
        <div className={classes.logo} href="/">
          <Image
            src="/img/sushi.svg"
            alt="sushi logo"
            height="40px"
            width="40px"
          />
        </div>
        <h1>Jushi</h1>
      </div>
      <div>
        <ul className={classes.list}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="#menu">Menu</Link>
          </li>
          <li>
            <Link href="#contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className={classes.cart}>
          <Link href="/cart" passHref>
            <div>
              <MdOutlineShoppingCart />
              <span
                className={`${classes.counter}  ${
                  cartIconAttention ? classes.attention : ''
                }`}
              >
                {cartTotalQuantity}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
