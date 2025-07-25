import * as productModel from '../models/productModel.js';

export async function listProducts(req, res) {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to list products' });
  }
}

export async function getProduct(req, res) {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
}

export async function createNewProduct(req, res) {
  try {
    const { name, description, price, version, imageUrl } = req.body;
    const newProduct = await productModel.createProduct({ name, description, price, version, imageUrl });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create product' });
  }
}
