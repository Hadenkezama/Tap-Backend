const connection = require('../database');


const getMany = (req, res) => {
  connection.query(`select * from spirit_catagories`, (err, result) => {
    if (err){
      res.status(400).json('Error returning all spirit catagories')
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
    `select * from spirit_catagories
    where catagorie_id = ${id}`, (err, result) => {
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
      res.status(400).json('Spirit type can not be left empty')
  }


  connection.query('insert into spirit_catagories set ?', catagorie, (err, result) => {
    if (err){
      res.status(400).json('Unable to add to database')
      console.log('Error inserting')
    }
    else{
      console.log(result)
      res.status(200).json('Spirit catagorie added')
    }
  })


}

const updateOne = (req, res) => {
  let { catagorie } = req.body
  id = req.params.id

if(!spirit_type){
    res.status(400).json('Spirit type can not be left empty')
}


  const query = 'UPDATE spirit_catagories SET spirit_type WHERE catagorie_id = ?'

  connection.query(query,[catagorie, id], (err, result) => {
    if(err){
      res.status(400).json('Error updating spirit catagorie')
    }
    else {
      res.status(200).json('Spirit catagorie has been updated')
    }
  })
    
    
    
}

const deleteOne = (req, res) => {
  let del = req.params.id

  if(!isNaN(del)){
    connection.query(`delete from spirit_catagories where catagorie_id = ${del}`, 
    (err, result) => {

      if(err){
        res.status(400).json('Unable to delete from database')
      }

      else{
        res.status(200).json('Spirit catagorie deleted')
      }

    })
  }
  else{
    return res.status(400).json('Invalid ID attempted to delete')
  }
}


  module.exports = { getMany, getOne, createOne, updateOne, deleteOne }