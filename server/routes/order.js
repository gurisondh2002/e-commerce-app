const ordersController = require("../controllers/ordersController");
const router = require("express").Router();

router.post("/addOrder",ordersController.addOrder);
router.get("/findOrder/:id",ordersController.getOneOrder);

module.exports = router;