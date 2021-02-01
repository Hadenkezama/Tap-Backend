const connection = require('../database');

const getByName = (req, res) => {
  connection.query(`select * from other where name = '${req.params.name}'`, (err, result) => {
    if(err){
      res.status(400).json('Error')
    }
   else{
     res.status(200).json(result)
   }
  })

}

const getMany = (req, res) => {
  connection.query(`select * from other`, (err, result) => {
    if (err){
      res.status(400).json('Error returning all others')
    }
    else{
    res.status(200).json(result)
    }
  })
}

const getOne = (req, res) => {
  
  let id = req.params.id
  if(!isNaN(id))
  connection.query(
    `select * from other
    where id = ${id}`, (err, result) => {
      if (err) throw err

      if (result.length === 0 ){
      res.status(400).json('No ID matching request')
      }
      else{
      res.status(200).json(result)
      }
    })
    else{
      res.status(400).json('Invalid ID request')
    }

}

const createOne = (req, res) => {
  let { name, img, amount, num_in_stock, price } = req.body

  if(!name){
    return res.status(400).json('Other name cannnot be left blank')
  }
  if(!amount){
    return res.status(400).json('Amount can not be left empty')
  }
  if(!num_in_stock){
    return res.status(400).json('Number in stock can not be left empy')
    //test if this fires when num in stock is equal to 0
  }
  if(!price){
    return res.status(400).json('The price can not be left empty')
  }
  

  let data = {
    name: name,
    img: img,
    amount: amount,
    num_in_stock: num_in_stock,
    price: price,
  }

  connection.query('insert into other set ?', data, (err, result) => {
    if (err){
      res.status(400).json('Unable to add to database')
      console.log('Error inserting')
    }
    else{
      console.log(result)
      res.status(200).json('Other added')
    }
  })


}

const updateOne = (req, res) => {
  let { name, img, amount, num_in_stock, price } = req.body
  id = req.params.id

  if(!name){
    return res.status(400).json('Other name cannnot be left blank')
  }
  if(!amount){
    return res.status(400).json('Amount can not be left empty')
  }
  if(!num_in_stock){
    return res.status(400).json('Number in stock can not be left empy')
    //test if this fires when num in stock is equal to 0
  }
  if(!price){
    return res.status(400).json('The price can not be left empty')
  }
  
  if(isNaN( price, amount, num_in_stock )){
    return res.status(400).json('A non number character was entered where number was supposed to be')
  }


  

  const query = 'UPDATE other SET name = ?, img = ?, amount = ?, num_in_stock = ?, price = ? WHERE id = ?'

  connection.query(query,[name, img, amount, num_in_stock, price, id], (err, result) => {
    if(err){
      res.status(400).json('Error updating other')
    }
    else {
      res.status(200).json('Other has been updated')
    }
  })
    
    
    
}

const deleteOne = (req, res) => {
  let del = req.params.id

  if(!isNaN(del)){
    connection.query(`delete from other where id = ${del}`, 
    (err, result) => {

      if(err){
        res.status(400).json('Unable to delete from database')
      }

      else{
        res.status(200).json('Other deleted')
      }

    })
  }
  else{
    return res.status(400).json('Invalid ID attempted to delete')
  }
}


  module.exports = { getMany, getOne, createOne, updateOne, deleteOne, getByName }