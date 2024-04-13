const Product = require("../models/Product");
const Cart = require("../models/Cart");

module.exports = {
    addToCart: async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body;
            if (!productId) {
                return res.status(400).json({ message: 'productId is required' });
            }
            let cart = await Cart.findOne({ userId });
            if (!cart) {
                cart = new Cart({ userId });
            }
            const existingProductIndex = cart.products.findIndex(
                (product) => product.cartItem && product.cartItem.toString() === productId
            );
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                cart.products.push({ cartItem: productId, quantity });
            }
            await cart.save();
            res.status(200).json({ message: 'Product added to cart successfully', cart });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getCart: async (req, res) => {
        const userId = req.params.id;

        try {
            const cart = await Cart.find({ userId }).populate('products.cartItem', "_id title imageUrl price supplier");
            res.status(200).json({ message: cart });
            console.log(cart)
        }
        catch (err) {
            res.status(500).json({ message: err });
            console.log(err)
        }
    },

    deleteCartItem: async (req, res) => {
        const cartItemId = req.params.cartItemId;

        try {
            const updatedCart = await Cart.findOneAndUpdate(
                { 'products._id': cartItemId },
                { $pull: { products: { _id: cartItemId } } },
                { new: true }
            );

            if (!updatedCart) {
                return res.status(404).json({ message: "Cart item not found..." });
            }
            res.status(200).json(updatedCart);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    decrementCartItem: async (req, res) => {
        const { userId, cartItem } = req.body;

        try {
            const cart = Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }

            const existingProduct = cart.products.find((product) => {
                product.cartItem.toString() === cartItem
            });

            if (!existingProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            if (existingProduct.quantity === 1) {
                cart.products = cart.products.filter(
                    (product) => product.cartItem.toString() !== cartItem
                )
            }
            else {
                existingProduct.quantity -= 1;
            }

            await cart.save();

            if (existingProduct.quantity === 0) {
                await Cart.updateOne(
                    { userId },
                    { $pull: { products: { cartItem } } }
                )
            }

            res.status(200).json({ message: "Product Updated" });
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    getCartCount: async (req, res) => {
        try {
            const { userId } = req.params; 
            const cart = await Cart.findOne({ userId });
            
            if (!cart) {
                return res.status(200).json({ totalProductQuantity: 0, message: "Cart not found" });
            }
            let totalProductQuantity = 0;
            for (const product of cart.products) {
                totalProductQuantity += product.quantity;
            }
            res.status(200).json({ 
                totalProductQuantity,
                message: "Total product quantity retrieved successfully" 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve total product quantity" });
        }
    }
}