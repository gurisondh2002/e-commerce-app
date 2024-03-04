const router = require("express").Router();
const authContrller = require("../controllers/authController");
const multer = require('multer');

// const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/' });

router.post("/register", upload.single('image'), authContrller.createUser);
router.post("/login", authContrller.loginUser);

module.exports = router;