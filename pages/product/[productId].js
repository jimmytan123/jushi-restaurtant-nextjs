import Image from 'next/image';
import classes from './Product.module.css';
// import { MongoClient, ObjectId } from 'mongodb';
import axios from 'axios';

const Product = ({ productData }) => {
  // const [size, setSize] = useState(0);

  return (
    <div className={classes.container}>
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
        {/* <span className={classes.price}>${sushi.price[size]}</span> */}
        <span className={classes.price}>${productData.price}</span>
        <p className={classes.description}>{productData.description}</p>
        {/* <h3 className={classes.choose}>Choose your size</h3>
        <div className={classes.sizes}>
          <div className={classes.size} onClick={() => setSize(0)}>
            <button>Small</button>
          </div>
          <div className={classes.size} onClick={() => setSize(1)}>
            <button>Large</button>
          </div>
        </div> */}
        <div className={classes.add}>
          <label htmlFor="quantity">Amount</label>
          <input
            type="number"
            defaultValue="1"
            min="1"
            max="5"
            step="1"
            className={classes.quantity}
            id="quantity"
          />
          <button className={classes.addToCartBtn}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

// export async function getStaticPaths() {
//   const client = await MongoClient.connect(process.env.MONGO_URL);
//   const db = client.db();
//   const productsCollection = db.collection('products');

//   // only interested in the id, so get the document objects but each just contain the id
//   // toArray() -- method returns an array of the Mongo documents available in the collection
//   const products = await productsCollection.find({}, { _id: 1 }).toArray();

//   client.close();

//   return {
//     fallback: 'blocking',
//     // paths key determines which paths will be pre-rendered
//     paths: products.map((product) => ({
//       params: { productId: product._id.toString() },
//     })),
//   };
// }

// export async function set(context) {
//   // fetch data for a single meetup

//   const productId = context.params.productId;

//   const client = await MongoClient.connect(process.env.MONGO_URL);
//   const db = client.db();
//   const productsCollection = db.collection('products');
//   // find object by id
//   const selectedProduct = await productsCollection.findOne({
//     _id: ObjectId(productId), // convert productId into ObjectId object -- same as the id form in the MongoDB, so it can search
//   });
//   client.close();

//   return {
//     props: {
//       productData: {
//         id: selectedProduct._id.toString(),
//         name: selectedProduct.name,
//         price: selectedProduct.price,
//         image: selectedProduct.image,
//         description: selectedProduct.description,
//       }, // will pass it the props
//     },
//   };
// }

export async function getServerSideProps(context) {
  const productId = context.params.productId;

  const res = await axios.get(
    `http://localhost:3000/api/products/${productId}`
  );
  // console.log(res.data);
  return {
    props: {
      productData: res.data,
    },
  };
}

export default Product;
