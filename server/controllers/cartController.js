const Product = require("../models/Product");
const Cart = require("../models/Cart");

module.exports = {
    addToCart: async (req, res) => {
        try {
            const userId = req.params.id;
            let productInCart = req.body.productInCart;
            if (!productInCart) {
                return res.status(400).json({ message: 'ProductId is missing in request body' });
            }
            else {

                let cart = await Cart.findOne({ userId });
                if (!cart) {
                    cart = new Cart({ userId });
                }
                const existingProductIndex = cart.products.findIndex(
                    (product) => product.productInCart == productInCart
                );
                if (existingProductIndex !== -1) {
                    cart.products[existingProductIndex].quantity += 1;
                } else {
                    cart.products.push({ productInCart: productInCart, quantity: 1 });
                }
                await cart.save();
                console.log(`Product ${productInCart} added to cart.`);
                res.status(200).json({ message: 'Product added to cart successfully', cart });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getCart: async (req, res) => {
        const userId = req.params.id;

        try {
            let cart = await Cart.findOne({ userId }).populate('products.productInCart');
            let total = 0;
            for (const item of cart.products) {
                item.subtotal = item.productInCart.price * item.quantity;
                total += item.subtotal;
                item.save();
            }
            let deliveryFee = 0;
            if (total < 250) {
                deliveryFee = Math.floor(Math.random() * 100) + 1;
            }
    
            cart.total = total + deliveryFee;
            cart.freeDelivery = deliveryFee;
    
            cart = await cart.save();
            res.status(200).json({ cart, message: "Cart fetched successfully" });
            console.log(cart);
        } catch (err) {
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
        const { productInCart } = req.body;
        const userId = req.params.id;
        console.log(req.body)

        try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }

            const existingProduct = cart.products.find(product => product.productInCart == productInCart);

            if (!existingProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            if (existingProduct.quantity == 1) {
                cart.products = cart.products.filter(product => product.productInCart != productInCart);
            } else {
                existingProduct.quantity -= 1;
            }
            await cart.save();
            res.status(200).json({ message: "Product Updated" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    incrementCartItem: async (req, res) => {
        const { productInCart } = req.body;
        const userId = req.params.id;

        try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }

            const existingProduct = cart.products.find(product => product.productInCart == productInCart);

            if (!existingProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            else {
                existingProduct.quantity += 1;
            }
            await cart.save();
            res.status(200).json({ message: "Product Updated" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
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