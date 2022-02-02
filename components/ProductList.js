import React from 'react';
import ProductCard from './ProductCard';
import classes from './ProductList.module.css';

const ProductList = () => {
  return (
    <div className={classes['product-list']}>
      <div className={classes.wrapper}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductList;
