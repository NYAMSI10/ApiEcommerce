const express = require('express')
const router = express.Router()


const produitController = require('../controllers/produit')


/**
 * @openapi
 * /api/produit/all:
 *   get:
 *     summary: Liste des produits
 *     description: Liste des produits
 *     responses:
 *       '200':
 *         description: Success
 */
router.get('/all', produitController.all)

/**
 * @openapi
 * /api/produit/{id}:
 *   get:
 *     summary: Détails d'un produits
 *     description: Détails d'un produits
 *     parameters:
 *          - in : path
 *            name: id
 *            required: true
 *            description : le id d'un produit
 *            schema:
 *            type: integer
 *     responses:
 *       '200':
 *         description: Success
 */
router.get('/:id', produitController.findById)



router.post('/add', produitController.create)



router.put('/update/:id', produitController.update)

/**
 * @openapi
 * /api/produit/{id}:
 *   delete:
 *     summary: supprimer un produit
 *     description: supprimer une produit
 *     parameters:
 *          - in : path
 *            name: id
 *            required: true
 *            description : le id d'un produit
 *            schema:
 *            type: integer
 *     responses:
 *       '200':
 *         description: Success
 */
router.delete('/:id', produitController.delete)
router.delete('/image/:id', produitController.deleteimage)


module.exports = router
