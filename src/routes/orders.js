const express = require('express')
const router = express.Router()


const ordersController = require('../controllers/orders')
const produitController = require("../controllers/produit");


/**
 * @openapi
 * /api/order/all:
 *   get:
 *     summary: Liste des commandes
 *     description: Liste des commandes
 *     responses:
 *       '200':
 *         description: Success
 */
router.get('/all', ordersController.all)


/**
 * @openapi
 * /api/order/add:
 *   post:
 *     summary: Ajouter une commande
 *     description: Ajouter une commande
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: Success
 */
router.post('/add', ordersController.create)





module.exports = router
