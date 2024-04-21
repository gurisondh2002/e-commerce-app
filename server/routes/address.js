const router = require("express").Router();
const addressController = require("../controllers/addressController");

router.post("/address/add", addressController.addAddress);
router.get("/address/getall", addressController.getAllAddresses);
router.get("/address/getone/:id", addressController.getAddress);
router.put("/address/update/:id", addressController.updateAddress);
router.delete("/address/delete/:id", addressController.deleteAddress);

module.exports = router;