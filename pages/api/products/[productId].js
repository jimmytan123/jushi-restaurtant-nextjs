import { MongoClient, ObjectId } from 'mongodb';

async function handler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = client.db();
  const productsCollection = db.collection('products');

  if (req.method === 'GET') {
    // find object by id
    const selectedProduct = await productsCollection.findOne({
      _id: ObjectId(req.query.productId), // convert productId into ObjectId object -- same as the id form in the MongoDB, so it can search
    });

    client.close();

    // send back response
    res.status(200).json(selectedProduct);
  }
}

export default handler;
