
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cartItems, updateQuantity, removeItem }) => {
  const navigate = useNavigate();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/payment', { state: { cartItems, total: calculateTotal() } }); // Pass cart details via state
  };

  return (
    <div className="container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                </td>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </td>
                <td>₹{item.price * item.quantity}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>Total: ₹{calculateTotal()}</h3>
      <button className="btn btn-success" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default CartPage;
