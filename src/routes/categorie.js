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
 * methode('Post')
 *
 */
router.post('/add',categorieController.create)

/**
 * methode('Put')
 *
 */
router.put('/update/:id',categorieController.update)

/**
 * methode('Delete')
 *
 */
router.delete('/delete/:id',categorieController.delete)

module.exports = router
