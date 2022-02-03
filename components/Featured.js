import Image from 'next/image';
import classes from './Featured.module.css';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Featured = () => {
  const contentLists = [
    {
      img: '/img/featured-1.jpg',
    },
    {
      img: '/img/featured-2.jpg',
    },
    {
      img: '/img/featured-3.jpg',
    },
  ];
  return (
    <div className={classes.featured}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        interval={10000}
        infiniteLoop={true}
        showArrows={false}
        transitionTime={500}
        showIndicators={false}
      >
        {contentLists.map((item, index) => {
          return (
            <div key={index} className={classes['img-container']}>
              <Image
                src={item.img}
                alt="sushi featured"
                layout="fill"
                objectFit="cover"
                priority='true'
              />
            </div>
          );
        })}
      </Carousel>
      <div className={classes.intro}>
        <h2>At Jushi</h2>
        <p>
          Our mission is to bring the freshest to our customers. With seasonal
          freshest and finest ingredients, you can expect a fine dining
          experience with an unforgettable atmosphere.
        </p>
      </div>
    </div>
  );
};

export default Featured;
