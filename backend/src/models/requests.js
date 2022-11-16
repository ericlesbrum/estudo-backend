const mongoose =require('mongoose');

const schema=new mongoose.Schema({
    clienteID:String,
    productID:String,
    startDate:Date,
    statusRequest:String
})

const Model=mongoose.model('pedidos',schema);
module.exports=Model;