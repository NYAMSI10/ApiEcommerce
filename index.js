const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const route = require('./src/routes/produit')
const options = require('./helpers/swagger')


const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(bodyParser.json());
app.use(authJwt())
app.use(errorHandler)

const produitRouter = require('./src/routes/produit')
const categorieRouter  = require('./src/routes/categorie')
const userRouter  = require('./src/routes/user')
const ordersRouter  = require('./src/routes/orders')

app.use('/api/produit', produitRouter)
app.use('/api/categorie', categorieRouter)
app.use('/api/user', userRouter)
app.use('/api/order', ordersRouter)

app.listen(5000, () => console.log("Server is running on port 5000"))
