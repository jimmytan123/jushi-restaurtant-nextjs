// POST /api/orders

import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // the data for the incoming request
      const data = req.body;

      // establish connection
      const client = await MongoClient.connect(process.env.MONGO_URL);

      // get access to database
      const db = client.db();

      // get access to collection, if does not exist, will create one automatically
      const ordersCollection = db.collection('orders');

      // insert the data object
      const order = await ordersCollection.insertOne(data);

      // close the database
      client.close();

      // send back response
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default handler;
