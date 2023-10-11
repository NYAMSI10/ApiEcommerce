const express = require('express')
const router = express.Router()

const produitController = require('../controllers/produit')

/**
 * methode('Get')
 *
 */
router.get('/all',produitController.all)
router.get('/:id',produitController.findById)


/**
 * methode('Post')
 *
 */
router.post('/add',produitController.create)


/**
 * methode('Put')
 *
 */
router.put('/update/:id',produitController.update)


/**
 * methode('Delete')
 *
 */
router.delete('/:id',produitController.delete)



module.exports = router
