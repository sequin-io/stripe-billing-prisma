import React from "react";
import Head from "next/head";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Billing - DataMachinist</title>
      </Head>
      <div className="w-full max-w-3xl mx-auto">
        <header className="py-8 text-center border-b">
          <h1 className="font-extrabold text-2xl ">🚂 DataMachinist</h1>
          <p className="italic">Your data on a railway</p>
        </header>
        <main className="my-8">
          <p className="text-xl pl-4">Hello Milena!</p>
          <p className="mt-4 p-6 shadow border-t rounded-md text-sm">
            Your DataMachinist subscription is{" "}
            <b>$25 per month billed annually</b>, and will renew on{" "}
            <b>April 16, 2022</b>.
          </p>
          <div className="mt-4 p-6 shadow border-t rounded-md">
            <h2 className="text-xl font-semibold">💳 Subscription</h2>
            <table className="w-full table-fixed mt-4">
              <tr className="border-b h-12">
                <td className="font-semibold">Payment Method</td>
                <td>
                  Visa <span className="font-mono">*0420</span>
                </td>
                <td className="text-right">
                  <a className="text-blue-500 cursor-pointer">Update</a>
                </td>
              </tr>
              <tr className="border-b h-12">
                <td className="font-semibold">Plan</td>
                <td>DataMachinist Annual</td>
              </tr>
              <tr className="h-12">
                <td className="font-semibold">Account Owner</td>
                <td>placeholder@syncinc.so</td>
              </tr>
            </table>
          </div>
          <div className="mt-4 p-6 shadow border-t rounded-md">
            <h2 className="text-xl font-semibold">👥 Team</h2>
            <div className="px-4 py-6 bg-gray-100 mt-4 rounded text-center">
              <h3 className="text-xl">Share data across your team.</h3>
              <p className="mt-2">
                You and your teammates can share DataMachinist databases and
                credentials securely with a team for your organization.
              </p>
              <button className="py-2 px-6 bg-black text-white rounded mt-6 font-semibold">
                Create Team
              </button>
            </div>
          </div>
          <div className="mt-4 p-6 shadow border-t rounded-md">
            <h2 className="text-xl font-semibold">🧾 Receipts</h2>
            <table className="w-full table-fixed mt-4">
              <tr className="border-b h-12">
                <td>April 16, 2021</td>
                <td>
                  Visa <span className="font-mono">*2420</span>
                </td>
                <td className="text-right">
                  <a className="text-blue-500 cursor-pointer">View</a>
                </td>
              </tr>
              <tr className="border-b h-12">
                <td>April 12, 2021</td>
                <td>
                  Visa <span className="font-mono">*2420</span>
                </td>
                <td className="text-right">
                  <a className="text-blue-500 cursor-pointer">View</a>
                </td>
              </tr>
              <tr className="h-12">
                <td>March 12, 2021</td>
                <td>
                  Visa <span className="font-mono">*2420</span>
                </td>
                <td className="text-right">
                  <a className="text-blue-500 cursor-pointer">View</a>
                </td>
              </tr>
            </table>
            <button className="text-blue-500 cursor-pointer py-2 w-full text-center font-bold mt-4">
              See All
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
