const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

/**
 * methode('Get')
 *
 */
router.get('/all',userController.all)
router.get('/:id',userController.findById)


/**
 * methode('Post')
 *
 */
router.post('/add',userController.create)
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
router.delete('/delete/:id',userController.delete)


module.exports = router
