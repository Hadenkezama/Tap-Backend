const express = require('express')
const router = express.Router()
const controllers = require('../CatagorieControllers/wineRegionController')
const verify = require('../Users/verifyToken')


router
.route('/')
.get(controllers.getMany)
.post(verify,controllers.createOne)

router
.route('/:id')
.get(controllers.getOne)
.put(verify,controllers.updateOne)
.delete(verify,controllers.deleteOne)




module.exports = router