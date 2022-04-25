const Product = require('../models/product');

const multer = require('multer');
const mongoose = require('mongoose');


const path = require('path');


//uploading images
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname+'_'+Date.now()+'_'+file.originalname);
    }
});

const upload = multer({ storage: storage }).single("image");


//register a new product
exports.register = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(500).json({
                message: 'Error uploading file'
            });
        }
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.file.filename
        });
        product.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Product created',
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    description: result.description,
                    imageUrl: result.imageUrl
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    });
};

//get all products
exports.getAll = (req, res, next) => {
    Product.find().then(documents => {
        res.status(200).json({
            message: 'Products fetched successfully',
            products: documents
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}


