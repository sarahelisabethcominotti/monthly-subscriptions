const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      start: {
        type: Date,
        default: "2000-01-01" 
      },
      end: {
        type: Date,
        default: "3000-01-01"
      },
      recurrency: {
        type: String,
        required: true,
      },
})

const SubscriptionModel = mongoose.model("subscriptions", SubscriptionSchema)

module.exports = SubscriptionModel