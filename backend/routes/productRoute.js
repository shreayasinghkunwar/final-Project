const express = require("express");
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

const router = express.Router();


router.route("/products").get(getAllProduct)

// Add new product
router.route("/products/new").post(createProduct);

//  Get Product details
router.route("/products/:id").get(getProductDetails)

//  Updating product
router.route("/products/:id").put(updateProduct);

// Delete product
router.route("/products/:id").delete(deleteProduct);



module.exports = router