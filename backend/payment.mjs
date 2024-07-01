import "dotenv/config"
import express from 'express'; // install from npm
import Stripe from 'stripe'; // install from npm

const stripe = new Stripe(process.env.STRIPE_SECRET); // your stripe secret here
const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {

  const { passengers } = req.body;
  const amount = passengers.reduce((sum, passenger) => sum + passenger.price, 0); // amount to pay

  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount is in cents
      currency: 'pkr', // currency
      payment_method_types: ['card'], // method
    });

    res.status(200).send({
      message: 'SUCCESS',
      clientSecret: paymentIntent.client_secret, // send this secret to frontend
    });

  } catch (err) {
    res.status(500).send({
      message: `UNKNOWN SERVER ERROR: ${err.message}`,
    })
  }

});

export default router;