const connection = require('../../database')
const {registerValidation, loginValidation} = require('../Validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




const createOne =  (req, res) => {

    const error = registerValidation(req.body)
if(error) return res.status(400).send(error)

connection.query(`select * from admin where name = '${req.body.name}'`, async (err, response) => {
   if(err){
       res.status(400).send('Error selecting from database')
   }
   else{
       if(response.length >= 1){
           res.status(400).send('User already exists')
       }
       else{

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        connection.query(`insert into admin (name , password) values ('${req.body.name}', '${hashPassword}')`, (err, result) => {
            if(err){
                res.status(400).send('Error')
            }
            else{
                res.status(200).send('User created')
            }
        })
       }
   }
})
}

const login = (req, res) => {

    const error = loginValidation(req.body)
if(error) return res.status(400).send(error)

connection.query(`select * from admin where name = '${req.body.name}'`, async (err , result)  => {
    if(err){
        res.status(400).send('Error getting user from database')
    }
    else{

      
        if(result.length === 0){
            res.status(400).json({auth: false, message:'Name or password is incorrect'})
        }
        else{
          const validPass = await bcrypt.compare(req.body.password, result[0].password)
          if(!validPass) return res.status(400).json({auth: false, message:'Name or password is incorrect'})

          var id = result[0].id
        
          const token =jwt.sign({id:id},process.env.TOKEN_SECRET,{
              expiresIn: 300,
          })

          req.session.user = result
          res.json({auth: true, token: token, result: result})
         
         
        }
    }
})
}

const isLoggedIn = (req, res) => {
    if (req.session.user){
        res.send({loggedIn:true, user:req.session.user})
    } else{
        res.send({loggedIn: false})
    }
}





module.exports = {createOne, login, isLoggedIn }