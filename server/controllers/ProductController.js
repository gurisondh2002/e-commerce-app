const Product = require("../models/Product");

module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json("Product created successfully");
        } catch (err) {
            console.log(err);
            res.status(500).json("Failed to create the product...");
        }
    },

    getAllProduct: async (req, res) => {
        console.log("hello")
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (err) {
            console.log(err);
            res.status(500).json("Failed to get all the product...");
        }
    },

    getAllProductMens: async (req, res) => {
        console.log("hello")
        try {
            const products = await Product.find({ category: "Mens" }).sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (err) {
            console.log(err);
            res.status(500).json("Failed to get all the product...");
        }
    },

    getAllProductWomen: async (req, res) => {
        console.log("hello")
        try {
            const products = await Product.find({ category: "Women" }).sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (err) {
            console.log(err);
            res.status(500).json("Failed to get all the product...");
        }
    },

    getAllProductKids: async (req, res) => {
        console.log("hello")
        try {
            const products = await Product.find({ category: "Kids" }).sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (err) {
            console.log(err);
            res.status(500).json("Failed to get all the product...");
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            console.log(err);
            res.status(500).json("Failed to get the product...");
        }
    },

    searchProduct: async (req, res) => {
        try {
            const result = await Product.aggregate(
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
            );
            res.status(200).json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json("Failed to get the products...");
        }
    },
    getCatSubcat: async (req, res) => {
        const { subCategory } = req.params;

        try {
            const products = await Product.find({ subCategory });

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found for the specified category and subcategory.' });
            }

            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        }

    }
};