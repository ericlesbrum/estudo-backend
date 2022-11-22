const mongoose =require('mongoose');

const schema=new mongoose.Schema({
    name:String,
    price:String,
})

const Model=mongoose.model('clientes',schema);
module.exports=Model;