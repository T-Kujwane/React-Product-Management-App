import Product from "../models/product.model.js";
import { mongoose } from "mongoose";

function validateProduct(id){
    return mongoose.Types.ObjectId.isValid(id);
}

export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});
        response.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("Get all products error: ", error.message);
        response.status(500).json({success: false, message: "Server error when getting products"});
    }
}

export const createProduct = async (request, response) => {
    const product = request.body;   

    if(!product.name || !product.price || !product.image){
       return response.status(400).json({success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        response.status(200).json({success: true, data: newProduct});
    } catch (error) {
        console.log('Error in create product: ', error.message);
        response.status(500).json({success: false, message: "Server error"});
    }
}

export const deleteProduct = async (request, response) => {
    const {id} = request.params;
    if (! validateProduct(id)){
        return response.status(404).json({success: false, message: "Product not found!"});
    }

    try {
        await Product.findByIdAndDelete(id);
        response.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        response.status(500).json({success: false, message: "Internal error"});
        console.log(`Delete error: `, error.message);
    }
}

export const updateProduct = async(request, response) => {
    const {id} = request.params;

    if (! validateProduct(id)){
        return response.status(404).json({success: false, message: "Product not found!"});
    }

    const product = request.body;
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        response.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        response.status(500).json({success: false, message: "Server could not update product"});
    }
}
