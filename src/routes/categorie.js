const express = require('express')
const router = express.Router()

const categorieController = require('../controllers/categorie')

/**
 * methode('Get')
 *
 */
router.get('/all',categorieController.all)
router.get('/:id',categorieController.findById)


/**
 * @openapi
 * /api/categorie/add:
 *   post:
 *     summary: Ajouter une catgorie
 *     description: Ajouter une catgorie
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success
 */
router.post('/add',categorieController.create)

/**
 * methode('Put')
 *
 */
router.put('/update/:id',categorieController.update)

/**
 * @openapi
 * /api/categorie/delete/{id}:
 *   delete:
 *     summary: supprimer une catgorie
 *     description: supprimer une catgorie
 *     parameters:
 *          - in : path
 *            name: id
 *            required: true
 *            description : le id d'une catgorie
 *            schema:
 *            type: integer
 *     responses:
 *       '200':
 *         description: Success
 */
router.delete('/delete/:id',categorieController.delete)

module.exports = router
