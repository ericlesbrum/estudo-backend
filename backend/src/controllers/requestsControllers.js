const RequestsModel = require('../models/requests');
async function get(req, res) {
    const { id } = req.params;

    const obj = id ? { _id: id } : null;

    const products = await (RequestsModel.find(obj));

    res.send(products);
}
async function post(req, res) {
    const {
        clienteID,
        productID,
        startDate,
        statusRequest
    } = req.body;

    const product = new RequestsModel({
        clienteID,
        productID,
        startDate,
        statusRequest
    })
    product.save()

    res.send();
}

async function remove(req, res) {
    const { id } = req.params;


    const remove = await RequestsModel.deleteOne({ _id: id });

    const message = !remove.ok ? 'sucess' : 'error';

    res.send({
        message
    })
}

module.exports = {
    get,
    post,
    remove
}