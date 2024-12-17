//const express = require("express");   old way of adding express.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productsRoute from "./routes/product.router.js";
//import { networkInterfaces } from 'os';
import cors from 'cors';
import path from 'path';

dotenv.config();

//Create server instance
const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

/*const getServerIp = () => {
    const interfaces = networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const interfaceInfo of interfaces[interfaceName]) {
            // Check for non-internal IPv4 addresses
            if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
                return interfaceInfo.address;
            }
        }
    }
    return '127.0.0.1'; // Fallback if no external IP is found
};*/
// Enable CORS
app.use(cors());
app.use(express.json());

app.use("/api/products", productsRoute);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
    //const serverIp = getServerIp();
    //console.log(`Server started on IP Address ${serverIp} and PORT ${PORT}`);
});
