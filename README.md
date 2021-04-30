# Pasos para ejecutar el proyecto

Servicio de la app compras

## Configapp.json

En este archivo se deben llenar los siguientes campos para el correcto funcionamiento del servicio.

```json
"db": {
  "url": "Url de cnx de la base de datos en mongoDB"
}
```

### `npm run build`

Antes de ejecutar el proyecto, se debe correr este comando para transpilar los archivos y poder lanzar el servicio.

### `npm start`

Comando para lanzar el servicio.

# Cómo se construyó el Servicio

Este servicio está realizado en NodeJS utlizando como como base de Datos MongoDB.

Para la conexión, y operaciones con la base de datos, se utilizó en paquete de Mogoose. Con este se crearon los modelos de las colecciones de la base de datos, consultas y operaciones a esta.

Para levantar el servidor en NodeJS se utilizó el paquete Express, el cuál sirve para levantar un servidor y crear sus diferentes rutas.

Para el manejo de errores se está utilizando el paquete Boom, que sirve para darle un mejor manejo y lazanr excepciones personalizadas.

Para el manejo de fechas y horas se está usando el paquete moment-timezone.

Se hace configuración de Babel para transpilar el código de la app y generar el archivo ejecutable.

# Endpoints del servicio

Las rutas que se crearon para este servicio son:

- GET(/)

    Esta ruta simplemente de respuesta de que el servicio se encuentre ok.
    
    Respuesta:

    ``{
        "ok": 1,
        "app": "Compras Tuya",
        "date": "2021-04-30, 5:52:04 pm"
    } ``

- GET(/getProducts)

    Esta ruta lista todos los productos almacenados en la colección products.

    Respuesta:

    ``{
    "data": [
        {
            "_id": id del prodcuto,
            "name": nombre del prodcuto,
            "image": url de la imagen del producto,
            "price": precio del prodcuto,
            "code": código del prodcuto,
            "__v": 0
        }
    ],
    "statusCode": 200
}``

- POST(/addProduct)

    Esta ruta de entrada sirve para almacenar un producto en la coleccón de porducts.

    Body:

    ``{
    "name": Nombre del producto,
    "image": url de la imagen del producto,
    "price": precio del prodcuto,
    "code": Código del producto
}``

- GET(/getOrders)

    Esta ruta lista todas las ordenes de compra almacenadas en la colección SellOrder

    ``{
    "data": [{
            "lineItems": Array con la lista de productos,
            "_id": id de la orden de compra,
            "buyerName": Nombre del cliente,
            "buyerPhone": Teléfono del cliente,
            "buyerEmail": Email del cliente,
            "shippingAddress": Dirección de envío,
            "shippingCity": ciudad de envío,
            "shippingRegion": región de envío,
            "shippingCountry": país de envío,
            "payMethod": Objeto con los datos del metodo de pago,
            "creationDate": fecha de creación de orden de compra,
            "orderNumber": Número de la orden
        }
    ],
    "statusCode": 200
}``

- GET(/getOrderDetails/:orderId)

Esta ruta trae por id los datos de una orden especifica que se le pasa en el parametro.

``{
    "data": [
        {
            "lineItems": Array con la lista de productos,
            "_id": id de la orden de compra,
            "buyerName": Nombre del cliente,
            "buyerPhone": Teléfono del cliente,
            "buyerEmail": Email del cliente,
            "shippingAddress": Dirección de envío,
            "shippingCity": ciudad de envío,
            "shippingRegion": región de envío,
            "shippingCountry": país de envío,
            "payMethod": Objeto con los datos del metodo de pago,
            "creationDate": fecha de creación de orden de compra,
            "orderNumber": Número de la orden
        }
    ],
    "statusCode": 201
}``

- POST(/addSellOrder)

Esta ruta sirve para almacenar una orden de compra en la colección SellOrder

Body:

``{
            "lineItems": Array con la lista de productos,
            "buyerName": Nombre del cliente,
            "buyerPhone": Teléfono del cliente,
            "buyerEmail": Email del cliente,
            "shippingAddress": Dirección de envío,
            "shippingCity": ciudad de envío,
            "shippingRegion": región de envío,
            "shippingCountry": país de envío,
            "payMethod": Objeto con los datos del metodo de pago,
        }``

