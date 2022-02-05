import { MongoClient, ObjectId } from 'mongodb';

// .../api/orders/[orderId]

async function handler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = client.db();
  const ordersCollection = db.collection('orders');

  if (req.method === 'GET') {
    try {
      // find object by id
      const selectedOrder = await ordersCollection.findOne({
        _id: ObjectId(req.query.orderId), // convert productId into ObjectId object -- same as the id form in the MongoDB, so it can search
      });

      client.close();

      // send back response
      res.status(200).json(selectedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default handler;
