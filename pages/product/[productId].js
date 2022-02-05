import React, { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './Product.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const Product = ({ productData }) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const dispatch = useDispatch();

  const handleAddCartItem = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    //console.log(enteredAmount);
    // convert string into number
    const enteredAmountValue = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    setAmountIsValid(true);

    dispatch(
      cartActions.addItemToCart({
        id: productData._id,
        name: productData.name,
        price: productData.price,
        quantity: enteredAmountValue,
      })
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.imgContainer}>
          <Image
            src={productData.image}
            layout="fill"
            alt="sushi"
            objectFit="cover"
          />
        </div>
      </div>
      <div className={classes.right}>
        <h1 className={classes.title}>{productData.name}</h1>
        <span className={classes.price}>${productData.price}</span>
        <p className={classes.description}>{productData.description}</p>
        <form className={classes.add}>
          <label htmlFor="quantity">Amount</label>
          <input
            type="number"
            defaultValue="1"
            min="1"
            max="5"
            step="1"
            className={classes.quantity}
            id="quantity"
            ref={amountInputRef}
          />
          <button onClick={handleAddCartItem} className={classes.addToCartBtn}>
            Add to Cart
          </button>
        </form>
        {!amountIsValid && (
          <p className={classes.error}>Please enter a valid amount (1 - 5)</p>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const productId = context.params.productId;

  const res = await axios.get(
    `http://localhost:3000/api/products/${productId}`
  );
  // console.log(res.data);
  return {
    props: {
      productData: res.data,
    },
  };
}

export default Product;
