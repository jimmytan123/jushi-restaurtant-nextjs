import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Featured from '../components/Featured';
import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* html metatags */}
      <Head>
        <title>Zushi Restaurant</title>
        <meta name="description" content="Food order app by Jimmy Tan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <ProductList />
    </div>
  );
}
