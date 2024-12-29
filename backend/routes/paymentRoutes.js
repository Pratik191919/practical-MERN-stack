// backend/routes/paymentRoutes.js
const express = require('express');
const Stripe = require('stripe');

const router = express.Router();
const stripeKey = process.env.STRIPE_SECRET_KEY
const stripe = Stripe(stripeKey) // Use environment variable for the secret key



// Payment endpoint
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // Amount should be in the smallest currency unit (e.g., cents for USD)

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr', // Replace with your desired currency
      payment_method_types: ['card'],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
