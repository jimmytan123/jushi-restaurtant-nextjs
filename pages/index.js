import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Featured from '../components/Featured';
import ProductList from '../components/ProductList';
// import { MongoClient } from 'mongodb';
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

// export async function getServerSideProps() {
//   const client = await MongoClient.connect(process.env.MONGO_URL);
//   const db = client.db();
//   const productsCollection = db.collection('products');
//   const products = await productsCollection.find().toArray();

//   client.close();

//   // always need to return an object
//   // so the products prop will be set and this component can retrieve it
//   return {
//     props: {
//       products: products.map((product) => ({
//         name: product.name,
//         description: product.description,
//         image: product.image,
//         price: product.price,
//         id: product._id.toString(),
//       })),
//       // products: res.data,
//     }, //will be passed to the page component as props
//   };
// }

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
