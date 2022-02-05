import React, { useState } from 'react';
import classes from './Cart.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import CheckoutForm from '../../components/CheckoutForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.items;
  const totalAmount = cart.totalAmount;
  const dispatch = useDispatch();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);

  const onSubmitOrder = async (userData) => {
    setShowForm(false);

    const dev = process.env.NODE_ENV !== 'production';
    const server = dev
      ? 'http://localhost:3000'
      : 'https://jushi-restaurant-nextjs.vercel.app';

    try {
      const response = await axios.post(`${server}/api/orders`, {
        orderedItems: cartItems,
        userInfo: userData,
        time: new Date().toLocaleString(),
        orderedAmount: totalAmount * 1.05,
      });

      if (response.status === 201) {
        //console.log(response.data);

        await router.push(`/orders/${response.data.insertedId}`);

        dispatch(cartActions.resetCart());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Jushi Restaurant - Your cart</title>
        <meta name="description" content="Food order app by Jimmy Tan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        className={classes.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
      >
        {cartItems.length === 0 && (
          <div className={classes.empty}>
            <p>Cart is empty</p>
          </div>
        )}
        {cartItems.length !== 0 && (
          <div className={classes.left}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => {
                  return (
                    <tr key={cartItem.id}>
                      <td>
                        <span className={classes.name}>{cartItem.name}</span>
                      </td>
                      <td>
                        <span
                          className={classes.price}
                        >{`$${cartItem.price}`}</span>
                      </td>
                      <td>
                        <span className={classes.quantity}>
                          {cartItem.quantity}
                        </span>
                      </td>
                      <td>
                        <span
                          className={classes.total}
                        >{`$${cartItem.totalPrice.toFixed(2)}`}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className={classes.right}>
          <div className={classes.wrapper}>
            <h2>Cart Total</h2>
            <div>
              <span>Subtotal:</span>
              {`$${totalAmount.toFixed(2)}`}
            </div>
            <div>
              <span>Tax:</span>{' '}
              {`$${parseFloat(totalAmount * 0.05).toFixed(2)}`}
            </div>
            <div>
              <span>Order Total:</span>
              {`$${parseFloat(totalAmount * 1.05).toFixed(2)}`}
            </div>
            {cartItems.length !== 0 && !showForm && (
              <button
                className={classes.button}
                onClick={() => setShowForm(true)}
              >
                Check Out
              </button>
            )}
            {cartItems.length !== 0 && !showForm && (
              <button
                className={classes.reset}
                onClick={() => dispatch(cartActions.resetCart())}
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
        {showForm && <CheckoutForm onSubmitOrder={onSubmitOrder} />}
      </motion.div>
    </>
  );
};

export default Cart;
