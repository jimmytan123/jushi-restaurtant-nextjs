import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Featured from '../components/Featured';
import ProductList from '../components/ProductList';
// import axios from 'axios';
import { motion } from 'framer-motion';
import ProductFilter from '../components/ProductFilter';

// for SSG
import { MongoClient } from 'mongodb';
import { useState } from 'react';

const Home = ({ products }) => {
  // console.log(products);

  const [productList, setProductLists] = useState(products);

  const handleChangeFilter = (category) => {
    if (category === 'popular') {
      setProductLists(
        products.filter((product) => product.category.includes('popular'))
      );
    } else if (category === 'starters') {
      setProductLists(
        products.filter((product) => product.category.includes('starters'))
      );
    } else if (category === 'maki') {
      setProductLists(
        products.filter((product) => product.category.includes('maki'))
      );
    } else if (category === 'nigiri') {
      setProductLists(
        products.filter((product) => product.category.includes('nigiri'))
      );
    } else if (category === 'noodles') {
      setProductLists(
        products.filter((product) => product.category.includes('noodles'))
      );
    } else if (category === 'drinks') {
      setProductLists(
        products.filter((product) => product.category.includes('drinks'))
      );
    } else if (category === 'all') {
      setProductLists(products);
    }
  };
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
      <ProductFilter onCategoryChange={handleChangeFilter} />
      <ProductList products={productList} />
    </motion.div>
  );
};

// Static-site generation
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
          _id: product._id.toString(),
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
          category: product.category,
        };
      }),
    },
    revalidate: 600,
  };
};

export default Home;
