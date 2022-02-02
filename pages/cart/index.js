import React from 'react';
import classes from './Cart.module.css';

const Cart = () => {
  return (
    <div className={classes.container}>
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
            <tr>
              <td>
                <span className={classes.name}>Sushi Combo</span>
              </td>
              <td>
                <span className={classes.price}>$19.90</span>
              </td>
              <td>
                <span className={classes.quantity}>1</span>
              </td>
              <td>
                <span className={classes.total}>$19.90</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes.right}>
        <div className={classes.wrapper}>
          <h2>Cart Total</h2>
          <div>
            <span>Subtotal:</span> $19.90
          </div>
          <div>
            <span>Discount:</span> $0.00
          </div>
          <div>
            <span>Order Total:</span> $19.90
          </div>
          <button className={classes.button}>Check out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
