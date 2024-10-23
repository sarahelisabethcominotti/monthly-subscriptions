const mongoose = require("mongoose");
const SubscriptionModel = require("../models/Subscriptions");

require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await SubscriptionModel.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
