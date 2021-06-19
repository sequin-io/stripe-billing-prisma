import React from "react";
import useSWR from "swr";

export default function Home() {
  let { data } = useSWR(`/api/customers`, fetcher);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <main className="my-8">
        <div className="relative overflow-hidden mb-8">
          <div className="rounded-t-xl overflow-hidden bg-gradient-to-r from-purple-50 to-purple-100 p-10">
            <p className="mb-4 text-sm text-purple-600">
              Select a customer to view their billing portal.
            </p>
            <ul className="list-disc list-inside text-purple-800">
              {data.customers.map(
                ({ id, email }: { id: string; email: string }) => (
                  <li>
                    <a href={`/billing/${id}`}>{email}</a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

// @ts-ignore
let fetcher = (...args) => fetch(...args).then((res) => res.json());
