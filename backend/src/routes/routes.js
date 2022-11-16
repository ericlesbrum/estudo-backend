const router =require('express').Router();

const ProductController=require('../controllers/productsController');
const ClientsController=require('../controllers/clientsController');
const RequestsControllers=require('../controllers/requestsControllers');

router.get('/products/:id?', ProductController.get);
router.post('/products', ProductController.post);
router.delete('/products/:id', ProductController.remove);

router.get('/clients/:id?', ClientsController.get);
router.post('/clients', ClientsController.post);
router.delete('/clients/:id', ClientsController.remove);

router.get('/requests/:id?', RequestsControllers.get);
router.post('/requests', RequestsControllers.post);
router.delete('/requests/:id', RequestsControllers.remove);

module.exports=router;