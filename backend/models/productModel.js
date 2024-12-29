const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Path to the uploaded image
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
