const express = require('express')
const router = express.Router()
const controllers = require('../DrinkControllers/wineControllers')
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

router
.route('/catagorie/wine_colour/:wine_colour')
.get(controllers.getColour)

router
.route('/catagorie/wine_region/:wine_region')
.get(controllers.getRegion)

router
.route('/catagorie/wine_colour/:wine_colour/wine_region/:wine_region')
.get(controllers.getColourandRegion)

router
.route('/search/:name')
.get(controllers.getByName)


module.exports = router