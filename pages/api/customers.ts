import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let customers = await prisma.customer.findMany({ take: 100 });

  res.status(200).send({ ok: true, customers });
}

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};
