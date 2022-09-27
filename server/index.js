import express from "express";

const app = express();
const port = 19003; //add your port here

const PUBLISHABLE_KEY =
  "pk_test_51Ll5efFetd1JSL8vQ1WpbGvxBewQSJi8ZUzB6WD0i19CUUkzdnaHAQzja4LNFMZpUWAZKUPTdSklL2KZSI1k9Qfy00MZ31WOSr";
const SECRET_KEY =
  "sk_test_51Ll5efFetd1JSL8vAtjcIIG8omCRUa1b0saZj5t6WDSwloNFSokDpWDWQaR6T0qkii0TiIWggKlDqjlM82OXcXRY00pAxMfnXu";
import Stripe from "stripe";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-08-01" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
