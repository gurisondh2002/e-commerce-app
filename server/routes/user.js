const router = require("express").Router();
const userContrller = require("../controllers/userController");

router.delete("/:id", userContrller.deleteUser);
router.get("/:id", userContrller.getUser);

module.exports = router; 