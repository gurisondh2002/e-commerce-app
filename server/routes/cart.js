const router = require("express").Router();
const cartController = require('../controllers/cartController');

router.get("/find/:id",cartController.getCart);
router.post("/addToCart/:id", cartController.addToCart);
router.post("/decCartItemQuantity/:id", cartController.decrementCartItem);
router.post("/incCartItemQuantity/:id", cartController.incrementCartItem);
router.delete("/deleteCartItem/:cartItemId", cartController.deleteCartItem);
router.get("/getCart/:userId", cartController.getCartCount);

module.exports = router;