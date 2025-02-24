const express = require('express');
const { resolve } = require('path');
const menuModel = require('./menuModel')
require('dotenv').config()
const connectToDb = require('./db');
const { connection } = require('mongoose');
const db = process.env.DB_URI

const app = express();
app.use(express.json())
const port = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.delete('/menu/:id', async (req,res)=>{
  const {id} = req.params
  try {
    const deletedUser = await menuModel.findByIdAndDelete(id)
    res.status(200).json({
      success:true,
      message: `Item with ${id} deleted`
    })
  } catch (error) {
    console.log('Error in deleting Item')
  }
})

app.put('/menu/:id', async(req,res)=>{
  const {id} = req.params
  const {name, description,price} = req.body

  try {
    const updatedItem = await menuModel.findByIdAndUpdate(id ,{name, description, price}, {new:true})
    if(!updatedItem){
      res.status(400).json({
        succes:false,
        message: `Item with ${id} not found`,
      })
    }
    else{
      res.status(200).json({
        success: true,
        message: 'Item update successful',
        Updated_Item: updatedItem
      })
    }

  } catch (error) {
    console.log('Error in updating data')
  }
})

app.listen(port, async() => {
  try {
    connectToDb(db)
    console.log(`Example app listening at http://localhost:${port}`);
  } catch (error) {
    console.log(error)
  }
});