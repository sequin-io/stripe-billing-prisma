import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

const client = new Client({ connectionString: process.env.PGCONN });
client.connect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let r = await client.query(`select * from customer limit 100`, []);
  let customers = r.rows;

  res.status(200).send({ ok: true, customers });
}
