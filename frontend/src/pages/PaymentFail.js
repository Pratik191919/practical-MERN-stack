import React from 'react';

const PaymentFail = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger">Payment Unsuccessful</h1>
      <p>It seems the payment was canceled or failed. Please try again.</p>
      <a href="/cart" className="btn btn-warning">Back to Cart</a>
    </div>
  );
};

export default PaymentFail;
