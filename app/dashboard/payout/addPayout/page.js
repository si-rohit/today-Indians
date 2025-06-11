'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {FaArrowLeft , FaArrowRight } from "react-icons/fa6";

export default function Page() {
  const [step, setStep] = useState(1);
  const [showStatesSuggestions, setShowStatesSuggestions] = useState(false);
  const [SuggestionsStateData , setSuggestionsStateData] = useState([]);

  const [documentData, setDocumentData] = useState({
    nationalProof: null,    
    taxProof: null,
    firstname: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    country: "",
    state: "",
    phoneNo:"",
    email:"",
  });

  documentData.nationalProof

  const [paymentMode, setPaymentMode] = useState("manual");
  const [paymentData, setPaymentData] = useState({
    manual: { bankHolderName:"",accountNumber: "", ifsc: "", bankName: "",swiftCode:"" },
    upi: { upiId: "" },
  });

  const [showBankSuggestions, setShowBankSuggestions] = useState(false);
  const [SuggestionsPaymentData , setSuggestionsPaymentData] = useState([]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleDocumentChange = (e) => {
    const { name, files, value } = e.target;
    setDocumentData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [paymentMode]: {
        ...prev[paymentMode],
        [name]: value,
      },
    }));
  };

  const handleSubmit = () => {
    console.log("Final Submission:", { documentData, paymentData });
    alert("Submitted successfully!");
  };

  const fetchStatwsData = async () => {
    try {
      const response = await fetch(`https://5341.general.pointer.8080-server.net/zone?c=99`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 1',
        },
        
      });
      const data = await response.json();
      setSuggestionsStateData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
 
  const filteredStates = SuggestionsStateData.filter((state) => state.name.toLowerCase().includes(documentData.state.toLowerCase()));
 
  const fetchBankData = async () => {
    try {
      const response = await fetch(`https://5341.general.pointer.8080-server.net/banks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 1',
        },
      });
      const data = await response.json();
      setSuggestionsPaymentData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchBankData(); 
    fetchStatwsData();
  },[]) 

  if (paymentMode === "manual") {
    var filteredBanks = SuggestionsPaymentData.filter((bank) =>
      bank.name.toLowerCase().includes(paymentData[paymentMode].bankName.toLowerCase())
    );
    
  }

  return (
    <div className="max-w-4xl p-6 shadow-md bg-white">
      {/* Step 1: Document Upload */}
      {step === 1 && (
        <div className="">
          <h2 className="text-xl font-semibold mb-4">Create Payout</h2>
          <hr className="border-t border-gray-300 mb-5"></hr>
            <div className="mb-4">
                <label className="block font-semibold">Full Name</label>
                <input
                type="text"
                name="firstname"
                value={documentData.firstname}
                onChange={handleDocumentChange}
                className="border border-gray-300 p-2 w-full"
                placeholder="rahul "
                />
            </div>         
          <div className="flex w-full justify-between items-center">
            <div className="mb-4 w-[48.5%]">
                <label className="block font-semibold">Phone no.</label>
                <input
                type="number"
                name="phoneNo"
                value={documentData.phoneNo}
                onChange={handleDocumentChange}
                className="border border-gray-300 p-2 w-full"
                placeholder="+91 1234567890 "
                />
            </div>
            <div className="mb-4 w-[48.5%]">
            <label className="block font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              value={documentData.email}
              onChange={handleDocumentChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="rahulsarma@example.com"
            />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Address 1</label>
            <input
              type="text"
              name="address1"
              value={documentData.address1}
              onChange={handleDocumentChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="Address"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Address 2</label>
            <input
              type="text"
              name="address2"
              value={documentData.address2}
              onChange={handleDocumentChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="Address 2 "
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="mb-4 w-[48.8%]">
                <label className="block font-semibold">Landmark</label>
                <input
                type="text"
                name="landmark"
                value={documentData.landmark}
                onChange={handleDocumentChange}
                className="border border-gray-300 p-2 w-full"
                placeholder="Landmark"
                />
            </div>
            <div className="relative mb-4 w-[48.5%]">
              <label className="block font-semibold">City</label>
              <input
                type="text"
                name="city"
                value={documentData.city}
                onChange={handleDocumentChange}
                className="border border-gray-300 p-2 w-full"
                placeholder="City"
              />   
            </div>
          </div>
          
          <div className="flex w-full justify-between items-center">
            <div className="mb-4 w-[48.8%]">
                <label className="block font-semibold">Country</label>
                <input
                type="text"
                name="country"
                value={documentData.country}
                onChange={handleDocumentChange}
                className="border border-gray-300 p-2 w-full"
                placeholder="India"
                />
            </div>
            <div className="relative mb-4 w-[48.5%]" onBlur={() => setTimeout(() => setShowStatesSuggestions(false), 500)}>
              <label className="block font-semibold">States</label>
              <input
                type="text"
                name="state"
                value={documentData.state}
                onChange={handleDocumentChange}
                onClick={() => setShowStatesSuggestions(true)}
                className="border border-gray-300 p-2 w-full"
                placeholder="Haryana"
              />
              {showStatesSuggestions && (
                <div className="absolute z-10 bg-white border border-gray-300 max-h-[200px] overflow-y-scroll w-full shadow-lg">
                  {filteredStates.map((state) => (
                    <div
                      key={state.zone_id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setDocumentData((prev) => ({
                          ...prev,
                          state: state.name,
                        }));
                        setShowStatesSuggestions(false);
                      }}
                    >
                      {state.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex w-full justify-between items-center mb-4">
            <div className="w-[48.5%]">
              <label className="block font-semibold">National ID</label>
              <input
                type="file"
                name="nationalProof"
                onChange={handleDocumentChange}
                className=" w-full hidden"   
                id="nationalProof"           
              />             
              <button onClick={() => document.getElementById("nationalProof").click()} className="text-black text-sm border border-gray-300 p-2 font-semibold ">Upload National ID</button>
            </div>
            <div className="w-[48.5%]">
              <label className="block font-semibold">Tex ID</label>
              <input
                type="file"
                name="taxProof"
                onChange={handleDocumentChange}
                className="hidden w-full"
                id="taxProof"
              />
              <button onClick={() => document.getElementById("taxProof").click()} className="text-black text-sm border border-gray-300 p-2 font-semibold ">Upload Tex ID</button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button onClick={handleNext} className="bg-black text-white px-4 py-2 flex justify-center items-center gap-3">
              Next <FaArrowRight />
            </button>
          </div>
          
        </div>
      )}

      {/* Step 2: Payment Info */}
      {step === 2 && ( 
      
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Info</h2>
          <hr className="border-t border-gray-300 mb-5"></hr>
         
          {/* Conditional Inputs */}
          {paymentMode === "manual" && (
            <>
              <div className="flex justify-between gap-4 mb-4">
                <div className="w-[48.5%]">
                  <label className="block font-semibold">Bank Holder name</label>
                  <input
                    type="text"
                    name="bankHolderName"
                    value={paymentData.manual.bankHolderName}
                    onChange={handlePaymentChange}
                    className="border p-2 w-full border-gray-300"
                  />
                </div>
                <div className="w-[48.5%] relative" onBlur={()=> setTimeout(() => setShowBankSuggestions(false), 500)}>
                  <label className="block font-semibold">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={paymentData.manual.bankName}
                    onChange={handlePaymentChange}
                    onClick={() => setShowBankSuggestions(true)}
                    className="border p-2 w-full border-gray-300"
                  />
                  {showBankSuggestions && (
                    <div className="absolute z-10 max-h-40 overflow-y-scroll w-full bg-white shadow-lg">
                      {filteredBanks.map((bank) => (
                        <div
                          key={bank.bank_id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setPaymentData((prev) => ({
                              ...prev,
                              manual: {
                                ...prev.manual,
                                bankName: bank.name,
                              },
                            }));
                            setShowBankSuggestions(false);
                          }}
                        >
                          {bank.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 ">
                <label className="block font-semibold">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={paymentData.manual.accountNumber}
                  onChange={handlePaymentChange}
                  className="border p-2 w-full border-gray-300"
                />
              </div>
              <div className="flex justify-between gap-4 mb-4">
                <div className="w-[48.5%]">
                  <label className="block font-semibold">IFSC Code</label>
                  <input
                    type="text"
                    name="ifsc"
                    value={paymentData.manual.ifsc}
                    onChange={handlePaymentChange}
                    className="border p-2 w-full border-gray-300"
                  />
                </div>
                <div className="w-[48.5%]">
                  <label className="block font-semibold">Swift Code</label>
                  <input
                    type="text"
                    name="swiftCode"
                    value={paymentData.manual.swiftCode}
                    onChange={handlePaymentChange}
                    className="border p-2 w-full border-gray-300"
                  />
                </div>
              </div>              
            </>
          )}

          <div className="flex justify-between mt-6">
            <button onClick={handleBack} className="bg-gray-400 flex justify-center items-center gap-3 text-white px-4 py-2 cursor-pointer">
            <FaArrowLeft /> Previous
            </button>
            <button onClick={handleNext} className="bg-black flex justify-center items-center gap-3 text-white px-4 py-2 cursor-pointer">
              Next <FaArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Review Details</h2>       
          <table className="w-full mb-4">
            <tbody className="w-full">
              <tr className="mb-2 bg-gray-200">
                <td className="px-4 py-2 border-t border-gray-300 w-1/2 border-r">Name</td>
                <td className="px-4 py-2 border-t border-gray-300">{documentData.firstname}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-300 border-r w-1/2">Email</td>
                <td className="px-4 py-2 border-t border-gray-300">{documentData.email}</td>
              </tr>
              <tr className="mb-2 bg-gray-200">
                <td className="px-4 py-2 border-t border-gray-300 border-r w-1/2">Phone</td>
                <td className="px-4 py-2 border-t border-gray-300">{documentData.phoneNo}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-300 border-r w-1/2">Country</td>
                <td className="px-4 py-2 border-t border-gray-300">{documentData.country}</td>
              </tr>
              <tr className="mb-2 bg-gray-200">
                <td className="px-4 py-2 border-t border-gray-300 border-r w-1/2">State</td>
                <td className="px-4 py-2 border-t border-gray-300">{documentData.state}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-300 border-r w-1/2">Address</td>
                <td className="px-4 py-2 border-t border-gray-300">{documentData.address}</td>
              </tr>
              <tr className="mb-2 bg-gray-200">
                <td className="px-4 py-2 border-t border-gray-300 border-r w-1/2">Citizen Proof</td>
                <td className="px-4 py-2 border-t border-gray-300">{documentData.nationalProof?.name}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-300 border-r w-1/2">Address Proof</td>
                <td className="px-4 py-2 border-t border-gray-300">{documentData.addressProof?.name}</td>
              </tr>
              <tr className="mb-2 bg-gray-200">
                <td className="px-4 py-2 border-y border-gray-300 border-r w-1/2">Income Proof</td>
                <td className="px-4 py-2 border-y border-gray-300">{documentData.taxProof?.name}</td>
              </tr>
            </tbody>
          </table>
          <div className="mb-4">
            <strong className="block font-semibold mb-2">Payment Data</strong>
            <table className="w-full mb-4">
            <tbody className="w-full">
              <tr className="mb-2 bg-gray-200">
                <td className="px-4 py-2 border-t border-gray-300 w-1/2 border-r">Payment Mode</td>
                <td className="px-4 py-2 border-t border-gray-300">{paymentMode}</td>
              </tr>
              {paymentMode === 'UPI' ? (
                <tr>
                  <td className="px-4 py-2 border-t border-gray-300 border-r w-1/2">UPI ID</td>
                  <td className="px-4 py-2 border-t border-gray-300">{paymentData.upi.upiId}</td>
                </tr>
              ):(
                <>             
                  <tr>
                    <td className="px-4 py-2 border-t border-gray-300 border-r w-1/2">Account Holder Name</td>
                    <td className="px-4 py-2 border-t border-gray-300">{paymentData.manual.bankHolderName}</td>
                  </tr>
                  <tr className="mb-2 bg-gray-200">
                    <td className="px-4 py-2 border-t border-gray-300 border-r w-1/2">Account Number</td>
                    <td className="px-4 py-2 border-t border-gray-300">{paymentData.manual.accountNumber}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-t border-gray-300 border-r w-1/2">Bank Name</td>
                    <td className="px-4 py-2 border-t border-gray-300">{paymentData.manual.bankName}</td>
                  </tr>
                  <tr className="mb-2 bg-gray-200">
                    <td className="px-4 py-2 border-t border-gray-300 border-r w-1/2">IFSC Code</td>
                    <td className="px-4 py-2 border-t border-gray-300">{paymentData.manual.ifsc}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-y border-gray-300 border-r w-1/2">Swift Code</td>
                    <td className="px-4 py-2 border-y border-gray-300">{paymentData.manual.swiftCode}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={handleBack} className="bg-gray-400 text-white px-4 py-2 ">
              Previous
            </button>
            <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 ">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
