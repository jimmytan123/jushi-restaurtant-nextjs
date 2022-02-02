import classes from './Navbar.module.css';
import Image from 'next/image';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import Link from 'next/link';

const Navbar = () => {
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
          <li>Menu</li>
          <li>Events</li>
        </ul>
      </div>
      <div>
        <div className={classes.cart}>
          <MdOutlineShoppingCart />
          <span className={classes.counter}>2</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
