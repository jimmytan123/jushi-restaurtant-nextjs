import React from 'react';
import Image from 'next/image';
import classes from './ProductCard.module.css';

import { useRouter } from 'next/router';

const ProductCard = ({ id, name, image, price }) => {
  const router = useRouter();
  const showDetailsHandler = () => {
    // programmatic navigation to product details page
    router.push(`/product/${id}`);
  };
  return (
    <div className={classes['product-card']}>
      <div className={classes['img-container']}>
        <Image
          src={image}
          alt="sushi roll combo"
          width={500}
          height={500}
          objectFit="cover"
        />
      </div>
      <h2 className={classes.title}>{name}</h2>
      <span className={classes.price}>{`$${Number(price).toFixed(2)}`}</span>
      <div className={classes.actions}>
        <button onClick={showDetailsHandler}>Order Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
