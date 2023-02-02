const express = require("express");
const router = express.Router();
const Order = require("../schemas/Order");

const dotenv = require("dotenv");
dotenv.config();

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  // const cartArray = req.body.cart.products.map((product) => ({
  //   _id: product._id,
  //   title: product.title,
  //   price: product.price,
  //   size: product.size,
  //   color: product.color,
  //   quantity: product.quantity,
  // }));

  const customer = await stripe.customers.create({
    //Have to fix maximum characters in cart
    metadata: {
      userId: req.body.userId.toString(),
      // cart: JSON.stringify(cartArray),
    },
  });
  const line_items = req.body.cart.products.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [item.img[0]],
          description: item.desc,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["IN"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "inr" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
    ],
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});

const createOrder = async (customer, data) => {
  // const products = JSON.parse(customer.metadata.cart);
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    // products: products,
    subtotal: data.amount_subtotal / 100,
    total: data.amount_total / 100,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    await newOrder.save();
  } catch (error) {
    console.log(error);
  }
};

//STRIPE WEBHOOK
//Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

// endpointSecret =
//   "whsec_ea981df3d4bdbde4e6b2a972fa6aa22718b817f145ece0ca73d3e472216246db";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("Webhook veryfied");
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        console.log("Web hook err");
        return;
      }

      data = event.data.object;
      eventType = req.body.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          createOrder(customer, data);
        })
        .catch((err) => console.log(err));
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;
