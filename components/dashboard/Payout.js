"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { payoutData } from "@/app/dashboard/payout/PayoutData";


const Payout = () => {
  const [payouts] = useState(payoutData);
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };
  const router = useRouter();

  return (
    <div className=" max-[769px]:p-0 max-[769px]:mt-2">
      <div className='flex justify-between items-center mb-6'>
        <div className="text-3xl font-bold">Payout</div>
        <button onClick={() => router.push("/dashboard/payout/addPayout")} className="bg-black hover:bg-[#222] text-white px-4 py-2 text-sm">+ Add Payout</button>
      </div>  
      <hr className="border-t border-gray-300 mb-5"></hr>

      <h3 className="text-lg font-semibold mb-2">All Payouts</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {payouts.map((payout) => (
          <div
            key={payout.id}
            className=" border border-gray-300 shadow-sm p-6 bg-white"
          >
            <div
              className="flex justify-between items-center cursor-pointer gap-10 min-w-[299px]"
              onClick={() => toggleExpand(payout.id)}
            >
              <div>
                <p className="font-semibold">{payout.user.name}</p>
                <p className="text-sm text-gray-600">{payout.date}</p>
              </div>
              <div className="flex items-center gap-4">
                {/* <p className="text-lg font-medium">{payout.amount}</p> */}
                {expanded === payout.id ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
            </div>

            {expanded === payout.id && (
              <div className="mt-4 text-sm text-gray-700">
                <h4 className="font-medium mb-2">User Details</h4>
                <p><strong>Name:</strong> {payout.user.name}</p>
                <p><strong>Email:</strong> {payout.user.email}</p>
                <p><strong>Phone:</strong> {payout.user.phone}</p>
                <p><strong>Country:</strong> {payout.user.country}</p>
                <p><strong>State:</strong> {payout.user.state}</p>
                <p><strong>Address:</strong> {payout.user.address}</p>

                <h4 className="font-medium mt-4 mb-2">Bank Details</h4>
                <p><strong>Account Holder:</strong> {payout.bank.accountHolder}</p>
                <p><strong>Account Number:</strong> {payout.bank.accountNumber}</p>
                <p><strong>IFSC:</strong> {payout.bank.ifsc}</p>
                <p><strong>Bank Name:</strong> {payout.bank.bankName}</p>
                <p><strong>Swift Code:</strong> {payout.bank.swiftCode}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payout;
