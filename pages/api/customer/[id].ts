import { Client } from "pg";
import type { NextApiRequest, NextApiResponse } from "next";

const client = new Client({ connectionString: process.env.PGCONN });
client.connect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id } = req.query;
  if (!id) {
    res
      .status(400)
      .send({ ok: false, error: "Request must contain a `customerId`" });
  } else {
    try {
      let customer = await getOne(`select * from customer where id = $1`, [id]);
      let subscription = await getOne(
        `select * from subscription where customer_id = $1`,
        [id]
      );
      let lastInvoice = await getOne(
        `select * from invoice where subscription_id = $1 order by created desc limit 1`,
        [subscription.id]
      );
      let paymentMethod = await getOne(
        `select * from payment_method where id = $1`,
        [customer.invoice_settings_default_payment_method_id]
      );
      let charges = await listAll(
        `select charge.*, payment_method.card_last4, payment_method.card_brand
        from charge
        inner join payment_method on payment_method.id = charge.payment_method_id
        where charge.customer_id = $1
        and charge.receipt_url is not null
        order by created desc`,
        [customer.id]
      );
      res.status(200).send({
        ok: true,
        customer,
        subscription,
        lastInvoice,
        paymentMethod,
        charges,
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({ ok: false, error: "Error querying the database" });
    }
  }
}

let listAll = async (query: string, params: any[]) => {
  let res = await client.query(query, params);
  return res.rows;
};

let getOne = async (query: string, params: any[]) => {
  let res = await client.query(query, params);
  return res.rows[0];
};
