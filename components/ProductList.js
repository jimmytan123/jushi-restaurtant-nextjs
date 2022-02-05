import React from 'react';
import ProductCard from './ProductCard';
import classes from './ProductList.module.css';

const ProductList = ({ products }) => {
  return (
    <div id="menu" className={classes['product-list']}>
      <div className={classes.wrapper}>
        {products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              image={product.image}
              description={product.description}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
