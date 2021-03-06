import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SellOrderSchema = new Schema({
  buyerName: {
    type: String,
    required: true
  },
  buyerPhone: {
    type: Number,
    required: true
  },
  buyerEmail: {
    type: String,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  shippingCity: {
    type: String,
    required: true
  },
  shippingRegion: {
    type: String,
    required: true
  },
  shippingCountry: {
    type: String,
    required: true
  },
  lineItems: {
    type: Array,
    required: true,
    default: {}
  },
  creationDate: {
    type: String,
    required: true
  },
  orderNumber: {
    type: String,
    required: true
  },
  payMethod: {
    type: Object,
    require: true
  }
})

const SellOrder = mongoose.model('SellOrder', SellOrderSchema)

module.exports = SellOrder
