import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";
import { ProductsProps } from "../../types/types";

interface ItemProps extends ProductsProps {
  quantity: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1LRKN8K6F9MAB56y2Q4kDBfi" },
          { shipping_rate: "shr_1LRKNUK6F9MAB56yts5BRauF" },
        ],

        line_items: req.body.map((item: ItemProps) => {
          // @ts-ignore
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/vfxfwnaw/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),

        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      });

      res.status(200).json(session);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
