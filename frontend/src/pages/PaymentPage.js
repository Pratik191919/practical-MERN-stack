
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your_stripe_publishable_key'); // Replace with your Stripe publishable key

const PaymentForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/payments/create-payment-intent', { amount: total * 100 });

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        alert('Payment Successful!');
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <CardElement className="form-control" />
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <button type="submit" className="btn btn-primary mt-4 w-100" disabled={!stripe || processing}>
        {processing ? 'Processing...' : `Pay ₹${total}`}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const { cartItems, total } = location.state || {};

  if (!cartItems || !total) {
    return (
      <div className="container text-center mt-5">
        <h2>No payment details available</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h4>Secure Payment</h4>
            </div>
            <div className="card-body">
              <h5 className="text-center mb-3">Order Total: ₹{total}</h5>
              <Elements stripe={stripePromise}>
                <PaymentForm total={total} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
