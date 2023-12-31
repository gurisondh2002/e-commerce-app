const ordersController = require("../controllers/ordersController");

const router = require("express").Router();
const orderController = require("../controllers/ordersController");

router.get("/:id",ordersController.getUserOrders);

module.exports = router;