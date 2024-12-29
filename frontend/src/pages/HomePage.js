import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

const HomePage = ({ addToCart, cartItems }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order: ascending
  const [noProductsFound, setNoProductsFound] = useState(false); // State to track if no products are found

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data); // Initially set filtered products as all products
    };
    fetchProducts();
  }, []);

  // Handle delete functionality
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      setFilteredProducts(filteredProducts.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle search by product name
  const handleSearch = (query) => {
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    // Set filtered products
    setFilteredProducts(result);
  
    // Check if no products were found
    if (result.length === 0) {
      setNoProductsFound(true);
    } else {
      setNoProductsFound(false);
    }
  };

  // Handle sorting by price
  const handleSort = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      return sortOrder === 'asc'
        ? a.price - b.price
        : b.price - a.price;
    });
    setFilteredProducts(sortedProducts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  return (
    <div>
      {/* Navbar with search and sort */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onSearch={handleSearch}
        onSort={handleSort}
      />
      <div className="container my-4">
        {noProductsFound ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <h3>No products found</h3>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredProducts.map((product) => (
              <div className="col" key={product._id}>
                <ProductCard product={product} addToCart={addToCart} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
