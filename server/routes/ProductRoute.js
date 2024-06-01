const router = require("express").Router();
const productController = require("../controllers/ProductController");

router.post('/', productController.createProduct);
router.get('/getllProducts',productController.getAllProduct);
router.get('/getllProducts/women',productController.getAllProductWomen);
router.get('/getllProducts/Mens',productController.getAllProductMens);
router.get('/getllProducts/kids',productController.getAllProductKids);
router.get('/:id',productController.getProduct);
router.get('/search/:key',productController.searchProduct);
router.get('/getllProducts/:subCategory',productController.getCatSubcat);

module.exports = router;