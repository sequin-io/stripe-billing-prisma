import React, { useEffect, useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";

export default function ShowBilling() {
  let router = useRouter();
  let { id } = router.query;
  let [showReceiptCount, setShowReceiptCount] = useState(3);
  let { data } = useSWR(`/api/customer/${id}`, fetcher);

  let incrReceiptCount = () => setShowReceiptCount((s) => s + 10);

  if (!data) {
    return <div>Loading...</div>;
  }

  let handleUpdatePaymentMethodClick = async () => {
    let res = await fetch(`/api/customer/billingPortal`, {
      method: "post",
      body: JSON.stringify({ id, returnUrl: window.location.href }),
      headers: { "content-type": "application/json" },
    });
    let j = await res.json();
    if (!j.ok) {
      alert("Something went wrong fetching the Stripe billing portal link");
    } else {
      router.push(j.url);
    }
  };

  return (
    <div className="container mx-auto">
      <Head>
        <title>Billing - DataExMachina</title>
      </Head>
      <div className="w-full max-w-3xl mx-auto">
        <header className="py-8 text-center border-b">
          <h1 className="font-extrabold text-2xl ">☦ DataExMachina</h1>
          <p className="italic">Your data. Here to save the day.</p>
        </header>
        <main className="my-8">
          <p className="text-xl pl-4">Hello!</p>
          <p className="mt-4 p-6 shadow border-t rounded-md text-sm">
            {data.lastInvoice ? (
              <>
                Your DataExMachina subscription is{" "}
                <b>
                  {formatAmount(data.lastInvoice.total)} per month billed month
                </b>
                , and will renew on{" "}
                <b>
                  {format(
                    parseISO(data.subscription.current_period_end),
                    "MMMM do, y"
                  )}
                </b>
                .
              </>
            ) : (
              <>No subscriptions setup yet.</>
            )}
          </p>
          <div className="mt-4 p-6 shadow border-t rounded-md">
            <h2 className="text-xl font-semibold">💳 Subscription</h2>
            <table className="w-full table-fixed mt-4">
              <tr className="border-b h-12">
                <td className="font-semibold">Payment Method</td>
                <td>
                  {data.paymentMethod ? (
                    <>
                      {capitalize(data.paymentMethod.card_brand)}{" "}
                      <span className="font-mono">
                        *{data.paymentMethod.card_last4}
                      </span>
                    </>
                  ) : (
                    <>No payment method on file yet</>
                  )}{" "}
                </td>
                <td className="text-right">
                  <a
                    onClick={handleUpdatePaymentMethodClick}
                    className="text-blue-500 cursor-pointer"
                  >
                    Update
                  </a>
                </td>
              </tr>
              <tr className="border-b h-12">
                <td className="font-semibold">Plan</td>
                <td>DataExMachina Monthly</td>
              </tr>
              <tr className="h-12">
                <td className="font-semibold">Account Owner</td>
                {data.customer ? (
                  <td>{data.customer.email}</td>
                ) : (
                  <td>No matching customer profile found</td>
                )}
              </tr>
            </table>
          </div>
          {/* <div className="mt-4 p-6 shadow border-t rounded-md">
            <h2 className="text-xl font-semibold">👥 Team</h2>
            <div className="px-4 py-6 bg-gray-100 mt-4 rounded text-center">
              <h3 className="text-xl">Share data across your team.</h3>
              <p className="mt-2">
                You and your teammates can share DataExMachina databases and
                credentials securely with a team for your organization.
              </p>
              <button className="py-2 px-6 bg-black text-white rounded mt-6 font-semibold">
                Create Team
              </button>
            </div>
          </div> */}
          <div className="mt-4 p-6 shadow border-t rounded-md">
            <h2 className="text-xl font-semibold">🧾 Receipts</h2>
            {data.charges ? (
              <>
                <table className="w-full table-fixed mt-4">
                  {data.charges
                    .slice(0, showReceiptCount)
                    .map((charge: any) => (
                      <tr key={charge.id} className="border-b h-12">
                        <td>
                          {format(parseISO(charge.created), "MMMM do, y")}
                        </td>
                        <td>
                          {charge.payment_method_details_type ==
                          "ach_credit_transfer" ? (
                            "ACH bank transfer"
                          ) : (
                            <>
                              {capitalize(charge.card_brand)}{" "}
                              <span className="font-mono">
                                *{charge.card_last4}
                              </span>
                            </>
                          )}
                        </td>
                        <td className="text-right">
                          <a
                            href={charge.receipt_url}
                            rel="noreferrer"
                            target="_blank"
                            className="text-blue-500 cursor-pointer"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                </table>
                {showReceiptCount < data.charges.length && (
                  <button
                    onClick={incrReceiptCount}
                    className="text-blue-500 cursor-pointer py-2 w-full text-center font-bold mt-4 bg-blue-50 rounded"
                  >
                    See More
                  </button>
                )}
              </>
            ) : (
              <>No charges found.</>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

let capitalize = (n: string) => n.charAt(0).toUpperCase() + n.slice(1);

let formatAmount = (cents: number) => `$${Math.trunc(cents / 100)}`;

// @ts-ignore
let fetcher = (...args) => fetch(...args).then((res) => res.json());
