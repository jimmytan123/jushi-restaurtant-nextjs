import React from 'react';
import classes from './Order.module.css';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';

const Order = ({ orderData }) => {
  const router = useRouter();

  const status = 0;

  // conditional class name
  const statusClass = (index) => {
    if (index - status < 1) {
      return classes.done;
    } else if (index - status === 1) {
      return classes.inProgress;
    } else if (index - status > 1) {
      return classes.undone;
    }
  };
  return (
    <div className={classes.container}>
      <h1>Your Order Has Been Placed!</h1>
      <div className={classes.left}>
        <div className={classes.row}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={classes.tr}>
                <td>
                  <span className={classes.id}>{`#${orderData._id.slice(
                    -4
                  )}`}</span>
                </td>
                <td>
                  <span className={classes.name}>
                    {orderData.userInfo.name}
                  </span>
                </td>
                <td>
                  <span className={classes.address}>
                    {orderData.userInfo.street}
                  </span>
                </td>
                <td>
                  <span
                    className={classes.total}
                  >{`$${orderData.orderedAmount.toFixed(2)}`}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={classes.row}>
          <div className={statusClass(0)}>
            <Image src="/img/paid.png" width={30} height={30} alt="paid" />
            <span>Payment</span>
            <div className={classes.checkedIcon}>
              <Image
                className={classes.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt="checked"
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/img/cook.png" width={30} height={30} alt="cook" />
            <span>Preparing</span>
            <div className={classes.checkedIcon}>
              <Image
                className={classes.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt="checked"
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt="bike" />
            <span>On the run</span>
            <div className={classes.checkedIcon}>
              <Image
                className={classes.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt="checked"
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image
              src="/img/delivered.png"
              width={30}
              height={30}
              alt="delivered"
            />
            <span>Delievered</span>
            <div className={classes.checkedIcon}>
              <Image
                className={classes.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt="checked"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.wrapper}>
          <h2>Order Infomation</h2>
          <div>
            <span>Order Total:</span> {`$${orderData.orderedAmount.toFixed(2)}`}
          </div>
          <button className={classes.button} disabled>
            PAID
          </button>
          <button onClick={() => router.push('/')} className={classes.button}>
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;

export const getServerSideProps = async (context) => {
  const orderId = context.params.orderId;

  const res = await axios.get(`http://localhost:3000/api/orders/${orderId}`);
  return {
    props: {
      orderData: res.data,
    },
  };
};
