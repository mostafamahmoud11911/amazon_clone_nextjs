import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req, res) => {
  const { items, email } = await req.json();

  try {
    const modifiedItem = items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["BD", "US", "OM", "CA", "GB"],
      },
      line_items: modifiedItem,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)),
      },
    });

    return new NextResponse(JSON.stringify({ id: session.id }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("erorrrrrrrrrrrrrrrr", { status: 500 });
  }
};
