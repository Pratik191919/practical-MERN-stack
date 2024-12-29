import React from 'react';

const ProductCard = ({ product, addToCart, onDelete }) => {
  // Fallback image URL
  const fallbackImage = 'https://via.placeholder.com/150'; // Placeholder image for missing images

  return (
    <div className="col mb-4">
      <div className="card shadow-sm border-light rounded">
        {/* Product image with fallback */}
        <img
          src={product.image || fallbackImage}
          alt={product.name}
          className="card-img-top"
          onError={(e) => e.target.src = fallbackImage}
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column align-items-center">
          <h5 className="card-title">{product.name}</h5>
          
          {/* Displaying fields with static labels */}
          <p className="card-text text-muted"><strong>Brand:</strong> {product.brand}</p>
          <p className="card-text text-primary font-weight-bold"><strong>Price:</strong> ₹{product.price}</p>
          
          <div className="d-flex justify-content-between w-100">
            <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
            <button className="btn btn-danger" onClick={() => onDelete(product._id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
