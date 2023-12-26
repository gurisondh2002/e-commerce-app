const Product = require("../models/Product");

module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json("Product created successfully");
        } catch (err) {
            res.status(500).json("Failed to create the product...");
        }
    },

    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json("Failed to get all the product...");
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json("Failed to get the product...");
        }
    },

    searchProduct: async (req, res) => {
        try {
            const res = await Product.aggregate(
                [
                    {
                        $search: {
                            index: "furniture",
                            text: {
                                query: req.params.key,
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    }
                ]
            )
            res.status(200).json(res);
        } catch (err) {
            res.status(500).json("Failed to get the products...");
        }
    }
}