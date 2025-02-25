const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your-stripe-secret-key');

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: 'price_xxx', // Replace with your Stripe price ID
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: 'https://your-netlify-url/success', // Update later
    cancel_url: 'https://your-netlify-url/cancel', // Update later
  });
  res.json({ id: session.id });
});

module.exports = router;
