const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

/**
 * @openapi
 * /api/user/all:
 *   get:
 *     summary: Liste des users
 *     description: Liste des users
 *     responses:
 *       '200':
 *         description: Success
 */
router.get('/all',userController.all)


router.get('/:id',userController.findById)


/**
 * methode('Post')
 *
 */
router.post('/register',userController.create)
router.post('/login',userController.login)


/**
 * methode('Put')
 *
 */
router.put('/update/:id',userController.update)


/**
 * methode('Delete')
 *
 */
/**
 * @openapi
 * /api/user/{id}:
 *   delete:
 *     summary: supprimer un user
 *     description: supprimer un user
 *     parameters:
 *          - in : path
 *            name: id
 *            required: true
 *            description : le id d'un user
 *            schema:
 *            type: integer
 *     responses:
 *       '200':
 *         description: Success
 */
router.delete('/:id',userController.delete)
/**
 * @openapi
 * /api/user/deleteall/{id}:
 *   delete:
 *     summary: supprimer un user avec le produit associé
 *     description:  supprimer un user avec le produit associé
 *     parameters:
 *          - in : path
 *            name: id
 *            required: true
 *            description : le id d'un user
 *            schema:
 *            type: integer
 *     responses:
 *       '200':
 *         description: Success
 */
router.delete('/deleteall/:id',userController.deleteUserandProduct)


module.exports = router
