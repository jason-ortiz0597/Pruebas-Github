const productController = require('../controllers/product');
const router = require ('express').Router();

router.post('/register', productController.register);

router.get('/getAll', productController.getAll);


module.exports = router;