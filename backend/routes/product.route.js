import express from 'express';
import { getAllProducts } from '../controllers/product.controller.js';

const productRoutes = express.Router();

productRoutes.get('/products', getAllProducts);

export default productRoutes;
