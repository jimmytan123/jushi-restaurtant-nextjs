import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Featured from '../components/Featured';
import ProductList from '../components/ProductList';
import axios from 'axios';

const Home = ({ products }) => {
  // console.log(products);
  return (
    <div className={styles.container}>
      {/* html metatags */}
      <Head>
        <title>Jushi Restaurant</title>
        <meta name="description" content="Food order app by Jimmy Tan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <ProductList products={products} />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get('http://localhost:3000/api/products');
  // console.log(res.data);
  return {
    props: {
      products: res.data,
    },
    revalidate: 10,
  };
};

export default Home;
