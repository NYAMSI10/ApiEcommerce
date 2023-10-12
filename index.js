const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authJwt = require('./helpers/jwt')
const errorHandler = require('.//helpers/error-handler')

app.use(express.json())
app.use(express.urlencoded({extended: false}))


// middleware
app.use(bodyParser.json());
app.use(authJwt())
app.use(errorHandler)


const produitRouter = require('./src/routes/produit')
const categorieRouter  = require('./src/routes/categorie')
const userRouter  = require('./src/routes/user')

app.use('/api/produit', produitRouter)
app.use('/api/categorie', categorieRouter)
app.use('/api/user', userRouter)

app.listen(5000, () => console.log("Server is running on port 5000"))
