import express from "express";
import { getAllProducts } from "../controllers/product.controller.js";
import { fetchProductsFromCollections } from "../services/productService.js"; // make sure the path is correct

const productRoutes = express.Router();

// Existing route for getting all products from a single collection
productRoutes.get("/products", getAllProducts);

// New route to fetch products from multiple collections
productRoutes.get("/multi-collection-products", async (req, res) => {
  const collectionNames = [
    "products",
    "Produkter till DB-Snacks & godis",
    "Produkts till DB-Storpack",
    "AK-products DB: Skafferi,frukt och grönt",
    "Andrey_Test.produkter_dryck_till_DB_long",
  ];

  try {
    const products = await fetchProductsFromCollections(collectionNames);
    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching products from multiple collections");
  }
});

export default productRoutes;
