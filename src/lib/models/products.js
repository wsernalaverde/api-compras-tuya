import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
