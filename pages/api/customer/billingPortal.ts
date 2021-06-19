import { NextApiRequest, NextApiResponse } from "next";
import btoa from "btoa";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id, returnUrl } = req.body;
  let r = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
    method: "post",
    body: `customer=${id}&return_url=${encodeURIComponent(returnUrl)}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(process.env.STRIPE_KEY + ":")}`,
    },
  });
  let j = await r.json();
  if (r.status !== 200) {
    console.error(j);
    res.status(400).send({ ok: false });
    return;
  }

  res.status(200).send({ ok: true, url: j.url });
}
