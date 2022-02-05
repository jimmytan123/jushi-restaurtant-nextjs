import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Featured from '../components/Featured';
import ProductList from '../components/ProductList';
import axios from 'axios';
import { motion } from 'framer-motion';

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
  const dev = process.env.NODE_ENV !== 'production';
  const server = dev
    ? 'http://localhost:3000'
    : 'https://jushi-nextjs-jimmy-tan.com';

  const res = await axios.get(`${server}/api/products`);
  // console.log(res.data);
  return {
    props: {
      products: res.data,
    },
    revalidate: 10,
  };
};

export default Home;
