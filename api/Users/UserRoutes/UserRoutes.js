const express = require ('express')
const Router = express.Router()
const {createOne, login} = require ('../UserControllers/UserController')
const verify = require('../verifyToken')

Router
.route('/')
.post(verify,createOne)


Router
.route('/login')
.post(login)




module.exports = Router