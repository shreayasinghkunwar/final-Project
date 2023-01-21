const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErr = require("../middleware/catchAssyncError");
const apiFeatures = require("../utils/apifeatures")
//  Create Product ---Admin

exports.createProduct = catchAsyncErr(
    async (req, res, next) => {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        }
        )
    })

//Get all product 
exports.getAllProduct = catchAsyncErr(async (req, res) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments()

    const apiFeature = new apiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products
    })

})

// Get product detail

exports.getProductDetails = catchAsyncErr(async (req, res, next) => {

    const productId = req.params.id;
    let product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 500))
    }

    res.status(200).json({
        success: true,
        product,
        productCount
    })
})

//Update Product --Admin side

exports.updateProduct = catchAsyncErr(async (req, res, next) => {

    const productId = req.params.id;
    let product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true, useFindAndModify: false
    })
    if (!product) {
        return next(new ErrorHandler("Product not found", 500))
    }
    //console.log('id', productId)
    //console.log('update', product)
    res.status(200).json({
        success: true,
        product
    })

})


// Delete Product --Admin side

exports.deleteProduct = catchAsyncErr(async (req, res, next) => {

    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete({ _id: productId });
    if (!deletedProduct) {
        return res.status(500).json({
            success: false,
            message: "Product not deleted"
        })
    }
    res.status(200).json({
        success: true,
        message: "Product deleted."
    })



})