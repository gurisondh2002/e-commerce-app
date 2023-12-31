const router = require("express").Router();
const authContrller = require("../controllers/authController");

router.post("/register", authContrller.createUser);
router.post("/login", authContrller.loginUser);

module.exports = router; 