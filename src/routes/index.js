import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Boom from 'boom'
import Db from '../lib/connection/db'
import Product from '../lib/models/products'
import sellOrder from '../lib/models/sellOrder' 
import moment from 'moment-timezone'

Db.connect()

const router = express.Router()

router.use(bodyParser.json())

router.use(cors({
  optionsSuccessStatus: 200
}))

router.get('/', (req, res) => res.status(200).json({ ok: 1, app: 'Compras Tuya', date: moment().format('YYYY-MM-DD, h:mm:ss a') }))

router.get('/getProducts', async (req, res) => {
  let response = {}

  try {
    let allProducts = await Product.find()

    response = {
      data: allProducts,
      statusCode: 200
    }
  } catch (e) {
    response = e.output ? e.output.payload : { error: e, statusCode: 500 }
  }
  res.status(response.statusCode).json(response)
})

router.post('/addProduct', async (req, res) => {
  let response = {}
  const body = req.body

  try {
    if (!body.name) {
      throw Boom.notFound('Name product not found or invalid')
    }

    body.code = `${Math.floor(Math.random() * 100)}`

    const newProduct = new Product(body)
    let product = await newProduct.save()
    
    response = {
      data: { product },
      statusCode: 201
    }
  } catch (e) {
    console.log(e)
    response = e.output ? e.output.payload : { error: e, statusCode: 500 }
  }

  res.status(response.statusCode).json(response)
})

router.post('/addSellOrder', async (req, res) => {
  let response = {}
  const body = req.body
  
  try {
    if (!body.lineItems) {
      throw Boom.notFound('Line Items not found or invalid')
    }

    // if (await sellOrder.findOne({ body.store })) {
    //   throw Boom.conflict('Store already exists')
    // }

    body.creationDate = moment().format('YYYY-MM-DD, h:mm:ss a')

    body.orderNumber = `TUYA${moment().unix()}${Math.floor(Math.random() * 100)}`

    const newOrder = new sellOrder(body)
    let order = await newOrder.save()
    
    response = {
      data: { order },
      statusCode: 201
    }
  } catch (e) {
    console.log(e)
    response = e.output ? e.output.payload : { error: e, statusCode: 500 }
  }

  res.status(response.statusCode).json(response)
})

router.get('/getOrders', async (req, res) => {
  let response = {}

  try {
    let allOrders = await sellOrder.find()

    response = {
      data: allOrders,
      statusCode: 200
    }
  } catch (e) {
    response = e.output ? e.output.payload : { error: e, statusCode: 500 }
  }
  res.status(response.statusCode).json(response)
})

router.get('/getOrderDetails/:orderId', async (req, res) => {
  let response = {}
  const id = req.params.orderId

  try {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      throw Boom.notFound('ID not found or invalid')
    }

    const order = await sellOrder.find({ _id: id })
    
    if (!order) {
      throw Boom.notFound('Order not found')
    }

    response = {
      data: order,
      statusCode: 201
    }
  } catch (e) {
    console.log(e)
    response = e.output ? e.output.payload : { error: e, statusCode: 500 }
  }

  res.status(response.statusCode).json(response)
})

module.exports = router
