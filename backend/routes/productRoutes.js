const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product = require('../models/productModel'); // Import the Product model

const router = express.Router();

// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Expose uploads folder statically
router.use('/uploads', express.static(uploadsDir));

// Get all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
    next(error);
  }
});

// Add a new product with file upload
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { name, brand, price, description } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, '/') : ''; // Convert Windows backslashes to forward slashes for URLs

    const product = new Product({ name, brand, price, description, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error: error.message });
    next(error);
  }
});

// Delete a product
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If the product has an associated image, delete the image file
    if (product.image) {
      const imagePath = path.join(__dirname, '../', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Replace the remove() method with findByIdAndDelete
    await Product.findByIdAndDelete(req.params.id); // Correct method to delete by ID

    res.status(200).json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
    next(error);
  }
});

module.exports = router;
