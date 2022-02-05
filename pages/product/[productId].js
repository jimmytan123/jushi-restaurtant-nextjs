import React, { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './Product.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Head from 'next/head';
import { motion } from 'framer-motion';

// for SSG
import { MongoClient, ObjectId } from 'mongodb';

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
    <>
      <Head>
        <title>Food Info - {productData.name}</title>
        <meta name="description" content="Food order app by Jimmy Tan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        className={classes.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.3 }}
      >
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
            <button
              onClick={handleAddCartItem}
              className={classes.addToCartBtn}
            >
              Add to Cart
            </button>
          </form>
          {!amountIsValid && (
            <p className={classes.error}>Please enter a valid amount (1 - 5)</p>
          )}
        </div>
      </motion.div>
    </>
  );
};

// Server-side rendering
// export async function getServerSideProps(context) {
//   const productId = context.params.productId;

//   const dev = process.env.NODE_ENV !== 'production';
//   const server = dev
//     ? 'http://localhost:3000'
//     : 'https://jushi-restaurant-nextjs.vercel.app';

//   const res = await axios.get(`${server}/api/products/${productId}`);
//   // console.log(res.data);
//   return {
//     props: {
//       productData: res.data,
//     },
//   };
// }

// Static-site generation
export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = client.db();
  const productsCollection = db.collection('products');

  const products = await productsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    // paths key determines which paths will be pre-rendered
    paths: products.map((product) => ({
      params: { productId: product._id.toString() },
    })),
  };
}

export const getStaticProps = async (context) => {
  const productId = context.params.productId;

  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = client.db();
  const productsCollection = db.collection('products');
  // find object by id
  const selectedProduct = await productsCollection.findOne({
    _id: ObjectId(productId), // convert productId into ObjectId object -- same as the id form in the MongoDB, so it can search
  });
  client.close();

  return {
    props: {
      productData: {
        _id: selectedProduct._id.toString(),
        name: selectedProduct.name,
        description: selectedProduct.description,
        image: selectedProduct.image,
        price: selectedProduct.price,
      }, // will pass it the props
    },
    revalidate: 100,
  };
};

export default Product;
