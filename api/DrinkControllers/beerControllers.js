const connection = require('../database');

const getByName = (req, res) => {
  connection.query(`select * from beers where name = '${req.params.name}'`, (err, result) => {
    if(err){
      res.status(400).json('Error')
    }
   else{
     res.status(200).json(result)
   }
  })

}

const getCatagorieType = (req, res) => {
console.log(req.params.catagorie)
  connection.query(`select * from beers T, beer_catagories S where S.catagorie ="${req.params.catagorie}" and S.beer_catagorie_id = T.beer_catagorie_id`, (err, result) =>{
    if(err){
      res.status(400).json('Error returning drinks of that catagorie')
    }
    else{
      res.status(200).json(result)
    }
  })
}

const getMany = (req, res) => {
  
  connection.query(`select * from beers`, (err, result) => {
    if (err){
      res.status(400).json('Error returning all beers')
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
    `select * from beers
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
  let { name, img, amount, num_in_stock, price, beer_catagorie_id } = req.body

  if(!name){
    return res.status(400).json('Beer name cannnot be left blank')
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
  if(!beer_catagorie_id){
    return res.status(400).json('The beer catagorie can not be left blank')
  }

  let data = {
    name: name,
    img: img,
    amount: amount,
    num_in_stock: num_in_stock,
    price: price,
    beer_catagorie_id: beer_catagorie_id
  }

  connection.query('insert into beers set ?', data, (err, result) => {
    if (err){
      res.status(400).json('Unable to add to database')
      console.log('Error inserting')
    }
    else{
      console.log(result)
      res.status(200).json('Beer added')
    }
  })


}

const updateOne = (req, res) => {
 
  let { name, img, amount, num_in_stock, price, catagorie_id } = req.body
  id = req.params.id
  

  

  if(!name){
    return res.status(400).json('Beer name cannnot be left blank')
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
  if(!catagorie_id){
    return res.status(400).json('The beer catagorie can not be left blank')
  }
  if(isNaN( price, amount, num_in_stock, catagorie_id )){
    return res.status(400).json('A non number character was entered where number was supposed to be')
  }


  

  const query = 'UPDATE beers SET name = ?, img = ?, amount = ?, num_in_stock = ?, price = ?, catagorie_id = ? WHERE id = ?'

  connection.query(query,[name, img, amount, num_in_stock, price, catagorie_id, id], (err, result) => {
    if(err){ 
    res.status(400).json('Error updating beer')
    }
    else {
      res.status(200).json('Beer has been updated')
    }
  })
    
    
    
}

const deleteOne = (req, res) => {
  let del = req.params.id

  if(!isNaN(del)){
    connection.query(`delete from beers where id = ${del}`, 
    (err, result) => {

      if(err){
        res.status(400).json('Unable to delete from database')
      }

      else{
        res.status(200).json('Beer deleted')
      }

    })
  }
  else{
    return res.status(400).json('Invalid ID attempted to delete')
  }
}


  module.exports = { getMany, getOne, createOne, updateOne, deleteOne, getCatagorieType, getByName }