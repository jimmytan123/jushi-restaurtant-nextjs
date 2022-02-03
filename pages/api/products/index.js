import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'GET') {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db();
    const productsCollection = db.collection('products');
    const result = productsCollection.find();
    const products = await result.toArray();

    await client.close();
    // send back response
    res.status(200).json(products);
  }
}

export default handler;
