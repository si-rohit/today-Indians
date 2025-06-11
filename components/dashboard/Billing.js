"use client";
import React from "react";

const Billing = () => {
  const billingInfo = {
    plan: "Pro",
    price: "₹1,999/month",
    nextBillingDate: "12 May 2025",
    paymentMethod: {
      type: "Credit Card",
      card: "**** **** **** 1234",
      expiry: "09/26",
    },
    invoices: [
      {
        date: "12 Apr 2025",
        amount: "₹1,999",
        status: "Paid",
      },
      {
        date: "12 Mar 2025",
        amount: "₹1,999",
        status: "Paid",
      },
      {
        date: "12 Feb 2025",
        amount: "₹1,999",
        status: "Paid",
      },
    ],
  };

  return (
    <div className=" ">
      <div className="flex justify-between items-center  mb-6">
          <h3 className="text-3xl font-bold">Billing</h3>
          <div className="flex items-center">
            <button className="py-2 cursor-pointer px-4 bg-[#171717] hover:bg-[#353535] text-white font-semibold transition">
              Pay Now 
            </button>
            <p className="text-lg font-semibold ml-2">₹21,499.00</p>
          </div>
          
        </div>
      <hr className="border-t border-gray-300 mb-5"></hr>
     
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
         {/* Current Plan */}
          <div className="bg-white border border-gray-200 p-2">
            <h3 className="text-xl font-semibold mb-2">Current Plan</h3>
            <p>
              <strong>Plan:</strong> {billingInfo.plan}
            </p>
            <p>
              <strong>Price:</strong> {billingInfo.price}
            </p>
            <p>
              <strong>Next Billing Date:</strong> {billingInfo.nextBillingDate}
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-gray-200 p-2">
            <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
            <p>
              <strong>Type:</strong> {billingInfo.paymentMethod.type}
            </p>
            <p>
              <strong>Card:</strong> {billingInfo.paymentMethod.card}
            </p>
            <p>
              <strong>Expiry:</strong> {billingInfo.paymentMethod.expiry}
            </p>
          </div>
      </div>
      
      
      <hr className="border-t border-gray-300 mb-5"></hr>

      {/* Billing History */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Billing History</h3>

        <div className="space-y-2">
          {billingInfo.invoices.map((invoice, index) => (
            <div
              key={index}
              className={`flex justify-between items-center border-b border-gray-300 pb-2`}
            >
              <div>
                <p className="font-medium">{invoice.date}</p>
                <p className="text-sm text-gray-600">{invoice.status}</p>
              </div>
              <div className="text-right font-semibold text-gray-800">
                {invoice.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Plan */}
      <div className="text-right mt-6">
        
      </div>
    </div>
  );
};

export default Billing;
