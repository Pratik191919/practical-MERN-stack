import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-success">Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <a href="/" className="btn btn-primary">Back to Home</a>
    </div>
  );
};

export default PaymentSuccess;
