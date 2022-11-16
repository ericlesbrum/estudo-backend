const ClientsModel = require('../models/clients');
async function get(req, res) {
    const { id } = req.params;

    const obj = id ? { _id: id } : null;

    const products = await (ClientsModel.find(obj));

    res.send(products);
}
async function post(req, res) {
    const {
        name,
        email,
        phone,
        address
    } = req.body;

    const product = new ClientsModel({
        name,
        email,
        phone,
        address
    })
    product.save()

    res.send();
}

async function remove(req, res) {
    const { id } = req.params;


    const remove = await ClientsModel.deleteOne({ _id: id });

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