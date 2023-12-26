const router = require("express").Router();
const productController = require("../controllers/ProductController");

router.post('/', productController.createProduct);
router.get('/',productController.getAllProduct);
router.get('/:id',productController.getProduct);
router.get('/search/:key',productController.searchProduct);

module.exports = router;