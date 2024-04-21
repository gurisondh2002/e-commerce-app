const Product = require("../models/Product");
const Favourites = require("../models/favourites");

module.exports = {
    addToFavourite: async (req, res) => {
        try {
            const userId = req.params.id;
            let productInFav = req.body.productInFav;
            if (!productInFav) {
                return res.status(400).json({ message: 'ProductId is missing in request body' });
            }
            else {

                let fav = await Favourites.findOne({ userId });
                if (!fav) {
                    fav = new Favourites({ userId });
                }

                fav.products.push({ productInFav: productInFav });
                await fav.save();
                console.log(`Product ${productInFav} added to Favourite.`);
                res.status(200).json({ message: 'Product added to favourite successfully', fav });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getFavourite: async (req, res) => {
        const userId = req.params.id;

        try {
            let fav = await Favourites.findOne({ userId }).populate('products.productInFav');
            res.status(200).json({ fav, message: "Favourites fetched successfully" });
        }
        catch (err) {
            res.status(500).json({ message: err });
            console.log(err)
        }
    },

    getFavouriteItem: async (req, res) => {
        const userId = req.params.id;
        const favItemId = req.params.favItemId;

        try {
            const fav = await Favourites.findOne({ userId });

            const favoriteItem = fav.products.find(product => product.productInFav == favItemId);

            if (!favoriteItem) {
                return res.status(200).json({ message: "Favorite item not found for the user." });
            }

            res.status(200).json({ favoriteItem, message: "Favorite item fetched successfully" });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    deleteFavItem: async (req, res) => {
        const favItemId = req.params.favItemId;

        try {
            const updateFav = await Favourites.findOneAndUpdate(
                { 'products._id': favItemId },
                { $pull: { products: { _id: favItemId } } },
                { new: true }
            );

            if (!updateFav) {
                return res.status(404).json({ message: "Favorites item not found..." });
            }
            res.status(200).json(updateFav);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },


    // getCartCount: async (req, res) => {
    //     try {
    //         const { userId } = req.params;
    //         const cart = await Cart.findOne({ userId });

    //         if (!cart) {
    //             return res.status(200).json({ totalProductQuantity: 0, message: "Cart not found" });
    //         }
    //         let totalProductQuantity = 0;
    //         for (const product of cart.products) {
    //             totalProductQuantity += product.quantity;
    //         }
    //         res.status(200).json({
    //             totalProductQuantity,
    //             message: "Total product quantity retrieved successfully"
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: "Failed to retrieve total product quantity" });
    //     }
    // }
}