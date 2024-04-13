const router = require("express").Router();
const cartController = require('../controllers/cartController');

router.get("/find/:id",cartController.getCart);
router.post("/", cartController.addToCart);
router.post("/quantity", cartController.decrementCartItem);
router.delete("/:cartItemId", cartController.deleteCartItem);
router.get("/getCart/:userId", cartController.getCartCount);

module.exports = router;