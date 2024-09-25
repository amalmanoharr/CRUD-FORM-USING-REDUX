require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require("./Models/User")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)

app.get('/',(req,res)=>{
    userModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/create',(req,res)=>{
    userModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    userModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    userModel.findByIdAndDelete({_id:id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log('Server is running');
})