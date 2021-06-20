import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id } = req.query;
  if (!id || typeof id !== "string") {
    res
      .status(400)
      .send({ ok: false, error: "Request must contain a `customerId`" });
  } else {
    try {
      let customer = await prisma.customer.findUnique({ where: { id } });
      if (!customer) {
        res
          .status(404)
          .send({ ok: false, error: `"No customer found for id "${id}"` });
        return;
      }

      let subscription = await prisma.subscription.findFirst({
        where: { customer_id: id },
      });

      let lastInvoice =
        subscription &&
        (await prisma.invoice.findFirst({
          where: { subscription_id: subscription.id },
          orderBy: { created: "desc" },
        }));

      let paymentMethodId = customer.invoice_settings_default_payment_method_id;

      let paymentMethod =
        paymentMethodId &&
        (await prisma.payment_method.findUnique({
          where: { id: paymentMethodId },
        }));

      let charges = await prisma.charge.findMany({
        where: { customer_id: id, receipt_url: { not: null } },
        orderBy: { created: "desc" },
        include: { payment_method: true },
      });

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

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};
