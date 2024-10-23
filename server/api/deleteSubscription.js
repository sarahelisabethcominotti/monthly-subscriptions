const mongoose = require("mongoose");
const SubscriptionModel = require("../models/Subscriptions");

require("dotenv").config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      const deletedSubscription = await SubscriptionModel.findByIdAndDelete(id);
      if (!deletedSubscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      res.json({ message: "Subscription deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
