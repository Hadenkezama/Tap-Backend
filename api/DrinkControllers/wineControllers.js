const connection = require('../database');

const getByName = (req, res) => {
  connection.query(`select * from wines where name = '${req.params.name}'`, (err, result) => {
    if(err){
      res.status(400).json('Error')
    }
   else{
     res.status(200).json(result)
   }
  })

} 
const getColour = (req, res) => {
  connection.query(`select * from wines T, wine_colour S where T.wine_colour = S.catagorie_id and S.catagorie = '${req.params.wine_colour}'`, (err, result) => {
  if(err){
    res.status(400).json('Error returning all wines of that catagorie')
  }
  else{
    res.status(200).json(result)
  }
})
}

const getRegion = (req, res) => {
  connection.query(`select * from wines T, wine_region S where T.wine_region = S.catagorie_id and S.catagorie = '${req.params.wine_region}'`, (err, result) => {
  if(err){
    res.status(400).json('Error returning all wines of that catagorie')
  }
  else{
    res.status(200).json(result)
  }
})
}

const getColourandRegion = (req, res) => {
  connection.query(`select * from wines T, wine_region S, wine_colour V where T.wine_region = S.catagorie_id and T.wine_colour = V.catagorie_id and S.catagorie = '${req.params.wine_region}' and V.catagorie = '${req.params.wine_colour}'`, (err, result) => {
  if(err){
    res.status(400).json('Error returning all wines of that catagorie')
  }
  else{
    res.status(200).json(result)
  }
})
}


const getMany = (req, res) => {
  connection.query(`select * from wines`, (err, result) => {
    if (err){
      res.status(400).json('Error returning all wines')
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
    `select * from wines
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
  let { name, img, amount, num_in_stock, price, wine_region, wine_colour } = req.body

  if(!name){
    return res.status(400).json('Wine name cannnot be left blank')
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
  if(!wine_colour){
    return res.status(400).json('The wine colour can not be left blank')
  }

  let data = {
    name: name,
    img: img,
    amount: amount,
    num_in_stock: num_in_stock,
    price: price,
    wine_region: wine_region,
    wine_colour: wine_colour,
  }

  connection.query('insert into wines set ?', data, (err, result) => {
    if (err){
      res.status(400).json('Unable to add to database')
      console.log('Error inserting')
    }
    else{
      console.log(result)
      res.status(200).json('Wine added')
    }
  })


}

const updateOne = (req, res) => {
  let { name, img, amount, num_in_stock, price, wine_region, wine_colour } = req.body
  id = req.params.id

  if(!name){
    return res.status(400).json('Spirit name cannnot be left blank')
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
  if(!wine_colour){
    return res.status(400).json('The wine colour catagorie can not be left blank')
  }
  if(isNaN( price, amount, num_in_stock, wine_colour )){
    return res.status(400).json('A non number character was entered where number was supposed to be')
  }


  

  const query = 'UPDATE wines SET name = ?, img = ?, amount = ?, num_in_stock = ?, price = ?, wine_region = ?, wine_colour = ? WHERE id = ?'

  connection.query(query,[name, img, amount, num_in_stock, price, wine_region, wine_colour, id], (err, result) => {
    if(err){
      res.status(400).json('Error updating wine')
    }
    else {
      res.status(200).json('Wine has been updated')
    }
  })
    
    
    
}

const deleteOne = (req, res) => {
  let del = req.params.id

  if(!isNaN(del)){
    connection.query(`delete from wines where id = ${del}`, 
    (err, result) => {

      if(err){
        res.status(400).json('Unable to delete from database')
      }

      else{
        res.status(200).json('Wine deleted')
      }

    })
  }
  else{
    return res.status(400).json('Invalid ID attempted to delete')
  }
}


  module.exports = { getMany, getOne, createOne, updateOne, deleteOne, getColour, getRegion, getColourandRegion, getByName }