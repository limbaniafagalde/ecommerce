//handle checkout
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {

if (req.method === "POST") {
    try {
        //Create a Checkout Session from body params
        const session = await stripe.checkout.sessions.create({
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['LU'],
            },

            allow_promotion_codes: true,
            shipping_options: [
              { shipping_rate: "shr_1LRtIpC0qcCq1oLwm8pT46yT" },
              { shipping_rate: "shr_1LRtVIC0qcCq1oLwwme5i5bI" }, 
            ],

            line_items: req.body.map((item) => {
                return {
                    price_data: {
                        currency: 'usd',

                        product_data: {
                            name: item.title,
                            images: [item.image.data.attributes.formats.thumbnail.url],
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
            //Bring people to the success or failed page
            success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`, //I`ll send the info of the session to the success page
            cancel_url: `${req.headers.origin}/canceled`,
        });
        res.status(200).json(session);
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
    }
 
} 
else{
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
}

}