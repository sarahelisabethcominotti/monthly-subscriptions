const express = require("express");
const app = express();
const mongoose = require("mongoose");
const SubscriptionModel = require("./models/Subscriptions");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",
  "https://monthly-subscriptions.netlify.app"
];

require("dotenv").config();
const PORT = process.env.PORT || 3001; // set up port for Render deply


app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || netlifyPattern.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}));
mongoose.connect(process.env.DB_URL);

app.get("/getSubscriptions", async (req, res) => {
  try {
    const result = await SubscriptionModel.find({});
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

app.post("/createSubscription", async (req, res) => {
  try {
    const subscriptionData = req.body;
    const newSubscription = new SubscriptionModel(subscriptionData);
    const savedSubscription = await newSubscription.save();
    res.json(savedSubscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/deleteSubscription/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubscription = await SubscriptionModel.findByIdAndDelete(id);

    if (!deletedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json({ message: "Subscription deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`server runs on port ${PORT}`);
});
