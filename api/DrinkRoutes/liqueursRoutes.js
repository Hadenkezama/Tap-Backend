const express = require('express')
const router = express.Router()
const controllers = require('../DrinkControllers/liqueursControllers')
const verify = require('../Users/verifyToken')


router
.route('/')
.get(controllers.getMany)
.post(verify,controllers.createOne)

router
.route('/:id')
.get(controllers.getOne)
.put(verify,controllers.updateOne)
.delete(controllers.deleteOne)

router
.route('/catagorie/:catagorie')
.get(controllers.getCatagorieType)

router
.route('/search/:name')
.get(controllers.getByName)


module.exports = router