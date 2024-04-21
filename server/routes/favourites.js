const router = require("express").Router();
const favController = require('../controllers/favouritesController');

router.get("/find/:id",favController.getFavourite);
router.get("/:id/:favItemId",favController.getFavouriteItem);
router.post("/addToFav/:id", favController.addToFavourite);
router.delete("/deleteFavItem/:favItemId", favController.deleteFavItem);

module.exports = router;