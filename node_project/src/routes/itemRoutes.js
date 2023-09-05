const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')
router.get('/', itemController.getAllItems)
router.post('/createitem', itemController.createItem)
router.get('/getitembyid/:id', itemController.getItemById)
router.put('/updateitem/:id', itemController.updateItem)
router.delete('/deleteitem/:id', itemController.deleteItem)
module.exports = router;
