import React from 'react';
import Image from 'next/image';
import classes from './ProductCard.module.css';

const ProductCard = () => {
  return (
    <div className={classes['product-card']}>
      <div className={classes['img-container']}>
        <Image
          src="/img/sushi-combo.jpg"
          alt="sushi roll combo"
          width={500}
          height={500}
        />
      </div>

      <h2 className={classes.title}>Sushi Roll Combo</h2>
      <span className={classes.price}>$19.90</span>
      <p className={classes.description}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat,
        debitis!
      </p>
    </div>
  );
};

export default ProductCard;
