const connection = require('../database');


const getMany = (req, res) => {
  connection.query(`select * from liqueurs_catagories`, (err, result) => {
    if (err){
      res.status(400).json('Error returning all liqueur catagories')
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
    `select * from liqueurs_catagories
    where liqueurs_catagorie_id = ${id}`, (err, result) => {
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
  let { catagorie } = req.body

  if(!catagorie){
      res.status(400).json('Catagorie can not be left empty')
  }


  connection.query('insert into liqueurs_catagories set ?', catagorie, (err, result) => {
    if (err){
      res.status(400).json('Unable to add to database')
      console.log('Error inserting')
    }
    else{
      console.log(result)
      res.status(200).json('Liqueur catagorie added')
    }
  })


}

const updateOne = (req, res) => {
  let { catagorie } = req.body
  id = req.params.id

if(!catagorie){
    res.status(400).json('Liqueur can not be left empty')
}


  const query = 'UPDATE liqueurs_catagories SET liqueur WHERE liqueurs_catagorie_id = ?'

  connection.query(query,[catagorie, id], (err, result) => {
    if(err){
      res.status(400).json('Error updating liqueur catagorie')
    }
    else {
      res.status(200).json('Liqueur catagorie has been updated')
    }
  })
    
    
    
}

const deleteOne = (req, res) => {
  let del = req.params.id

  if(!isNaN(del)){
    connection.query(`delete from liqueurs_catagories where liqueurs_catagorie_id = ${del}`, 
    (err, result) => {

      if(err){
        res.status(400).json('Unable to delete from database')
      }

      else{
        res.status(200).json('Liqueur catagorie deleted')
      }

    })
  }
  else{
    return res.status(400).json('Invalid ID attempted to delete')
  }
}


  module.exports = { getMany, getOne, createOne, updateOne, deleteOne }