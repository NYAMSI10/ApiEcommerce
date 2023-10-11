const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authJwt = require('./helpers/jwt')
const secret = "bb";
const {expressjwt} = require("express-jwt");


app.use(express.json())
app.use(express.urlencoded({extended: false}))

// middleware
app.use(bodyParser.json());
app.use(
    expressjwt({
        secret:secret, // Remplacez par votre propre clé secrète
        algorithms: ['HS256'], // L'algorithme de signature du token
    }).unless({ path: [ '/api/user/login'] }) // Les routes exemptées de l'authentification
);

const produitRouter = require('./src/routes/produit')
const categorieRouter  = require('./src/routes/categorie')
const userRouter  = require('./src/routes/user')

app.use('/api/produit', produitRouter)
app.use('/api/categorie', categorieRouter)
app.use('/api/user', userRouter)

app.listen(5000, () => console.log("Server is running on port 5000"))
