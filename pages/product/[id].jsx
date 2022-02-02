// import React, { useState } from 'react';
import Image from 'next/image';
import classes from './Product.module.css';

const Product = () => {
  // const [size, setSize] = useState(0);
  const sushi = {
    id: 1,
    img: '/img/sushi-combo.jpg',
    name: 'Sushi Combo',
    // price: [19.9, 27.9],
    price: 19.9,
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores dicta totam rem laudantium, obcaecati aspernatur.',
  };
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.imgContainer}>
          <Image
            src={sushi.img}
            layout="fill"
            alt="sushi"
            objectFit="contain"
          />
        </div>
      </div>
      <div className={classes.right}>
        <h1 className={classes.title}>{sushi.name}</h1>
        {/* <span className={classes.price}>${sushi.price[size]}</span> */}
        <span className={classes.price}>${sushi.price}</span>
        <p className={classes.description}>{sushi.desc}</p>
        {/* <h3 className={classes.choose}>Choose your size</h3>
        <div className={classes.sizes}>
          <div className={classes.size} onClick={() => setSize(0)}>
            <button>Small</button>
          </div>
          <div className={classes.size} onClick={() => setSize(1)}>
            <button>Large</button>
          </div>
        </div> */}
        <div className={classes.add}>
          <label htmlFor="quantity">Amount</label>
          <input
            type="number"
            defaultValue="1"
            min="1"
            max="5"
            step="1"
            className={classes.quantity}
            id="quantity"
          />
          <button className={classes.addToCartBtn}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
