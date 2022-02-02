import classes from './Footer.module.css';
import Image from 'next/image';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes['footer-item']}>
          <Image
            src="/img/featured-3.jpg"
            width={370}
            height={370}
            objectFit="cover"
            alt="store"
          />
        </div>
        <div className={classes['footer-item']}>
          <h2>Jushi Japanese Restaurant</h2>
          <p>555 Seymour St, Vancouver, BC V6B 3H6</p>
          <p>Tel: (604)-555-5555</p>
          <p>Email: fake@jushi.com</p>
          <div className={classes.icons}>
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
        </div>
        <div className={classes['footer-item']}>
          <h2>Hours</h2>
          <p className={classes.day}>Monday - Thursday</p>
          <p>11:30 am - 3:00 pm</p>
          <p>5:00 pm to 9:00 pm</p>
          <p className={classes.day}>Friday - Sunday</p>
          <p>11:00 am to 3:00 pm</p>
          <p>5:00 pm to 10:00 pm</p>
        </div>
        <div>&copy; 2022 Jimmy(Zhixi) Tan</div>
      </div>
    </footer>
  );
};

export default Footer;
