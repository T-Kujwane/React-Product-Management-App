import { useState } from "react";
import {create} from "zustand";

const API_GATEWAY = "/api/products/";

export const useProductStore = create((set) => ({
    products: [], 
    setProducts: (products) => set({products}),
    createProduct: async(newProduct) => {
        if (! newProduct.name || !newProduct.image || !newProduct.price){
            return {success: false, message: "Please fill in all fields."};
        }

        const response = await fetch(API_GATEWAY, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newProduct)
        })

        const data = await response.json();

        set((state) => ({products: [...state.products, data.data]}));
        return {success: true, message: "Product created successfuly."}
    },

    fetchProducts: async() => {
        const response = await fetch(API_GATEWAY);
        const data = await response.json();
        set({products: data.data});
    }, 

    deleteProduct: async(productID) => {
        const response = await fetch(API_GATEWAY + productID, {
            method: "DELETE"
        });

        const data = await response.json();
        if (! data.success){
            return {success: false, message: data.message}
        }

        set(state => ({products: state.products.filter(product => product._id !== productID)}));

        return {success: true, message: data.message};
    }, 

    updateProduct: async(productID, updatedProduct) => {
        const response = await fetch(API_GATEWAY + productID, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });

        const data = await response.json();

        if (! data.success){
            return {success: false, message: data.message}
        }

        set((state) => ({
            products: state.products.map((product) => (product._id === productID ? data.data : product))
        }));

        return {success: data.success, message: data.message};
    }
}));
