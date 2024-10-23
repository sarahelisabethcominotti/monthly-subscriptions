const mongoose = require("mongoose");
const SubscriptionModel = require("../models/Subscriptions");

require("dotenv").config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const subscriptionData = req.body;
      const newSubscription = new SubscriptionModel(subscriptionData);
      const savedSubscription = await newSubscription.save();
      res.status(201).json(savedSubscription);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
