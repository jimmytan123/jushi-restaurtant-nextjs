import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Featured from '../components/Featured';
import ProductList from '../components/ProductList';
// import axios from 'axios';
import { motion } from 'framer-motion';
import { MongoClient } from 'mongodb';

const Home = ({ products }) => {
  // console.log(products);
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
    >
      {/* html metatags */}
      <Head>
        <title>Jushi Restaurant</title>
        <meta
          name="description"
          content="Food order app built in Next.js by Jimmy Tan"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <ProductList products={products} />
    </motion.div>
  );
};

export const getStaticProps = async () => {
  // const res = await axios.get('http://localhost:3000/api/products');
  // // console.log(res.data);
  // return {
  //   props: {
  //     products: res.data,
  //   },
  //   revalidate: 10,
  // };

  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = client.db();
  const productsCollection = db.collection('products');
  const result = productsCollection.find();
  const products = await result.toArray();

  await client.close();

  return {
    props: {
      products: products.map((product) => {
        return {
          name: product.name,
          description: product.description,
          image: product.image,
          _id: product._id.toString(),
          price: product.price,
        };
      }),
    },
    revalidate: 10,
  };
};

export default Home;
