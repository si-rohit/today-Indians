'use client'
import { useEffect, useState } from "react";

const WalletSection = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeTransectionTab, setActiveTransectionTab] = useState('Withdraw');
  const [transactions, setTransactions] = useState([]);
    // const transactions = [
    //   { id: 1, title: "Article Bonus", amount: 150, type: "Credit", date: "2025-04-01" },
    //   { id: 2, title: "Ad Revenue", amount: 230, type: "Credit", date: "2025-04-03" },
    //   { id: 3, title: "Video Monetization", amount: 120, type: "Credit", date: "2025-04-04" },
    //   { id: 4, title: "Withdrawal", amount: 300, type: "Debit", date: "2025-04-05" },
    //   { id: 5, title: "Article Bonus", amount: 100, type: "Credit", date: "2025-04-06" },
    //   { id: 6, title: "Promotional Spend", amount: 80, type: "Debit", date: "2025-04-07" },
    //   { id: 7, title: "Video Monetization", amount: 90, type: "Credit", date: "2025-04-08" },
    // ];
    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const response = await fetch("https://5341.general.pointer.8080-server.net/statement?uid=&status=&pg=&descr=&channel=48&from_date=&to_date=&sort=x_date&manager=&banker=&reciever=");
          const data = await response.json();
          // console.log(data);
          setTransactions(data.data);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };
      fetchTransactions();
    }, []);

    // console.log(transactions);

    const filteredData = activeTab === "All" ? transactions : transactions.filter((item) => item.descr === activeTab);
    // console.log(filteredData);
  
    const balance = transactions.reduce((acc, tx) => tx.type === "Credit" ? acc + tx.amount : acc - tx.amount, 0);
  
    return (
      <div className="p-4 max-[769px]:p-0">
        <div className="text-3xl font-bold mb-6 max-[769px]:mb-2">Wallet</div>
        <hr className="border-t border-gray-300 mb-5"></hr>
        <div className="flex justify-between  mb-4">
          <div className="flex gap-4 items-center justify-center flex-col min-h-5 bg-white border border-gray-200 min-w-120">
            <div className="flex items-end mb-2">
              <span className="text-gray-600">Current Balance:</span>
              <span className="text-2xl font-bold ml-2">${balance}.00</span>
            </div>         
          </div>
          <div className="flex gap-5 bg-white border border-gray-200 p-3">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{activeTransectionTab} Money</h3>
                <div className="flex">
                  <button onClick={() => setActiveTransectionTab('Withdraw')} className={`py-2 cursor-pointer px-4 hover:bg-[#f1f1f1] text-black font-semibold ${activeTransectionTab === 'Withdraw' ? 'bg-[#f1f1f1]' : ''}`}>Withdraw</button>
                  <button onClick={() => setActiveTransectionTab('Deposit')} className={`ml-2 py-2 cursor-pointer px-4 hover:bg-[#f1f1f1]  hover:text-black font-semibold ${activeTransectionTab === 'Deposit' ? 'bg-[#f1f1f1]' : ''}`}>Deposit</button>
                </div>
              </div>
              
              {activeTransectionTab === 'Withdraw' ? (
                <div>
                   <p className="mt-3">Enter Amount</p>
                   <input type="text" placeholder="500.00" className="border border-gray-300 p-2 min-w-120"></input>
                </div>
              ):(
                <div>              
                  <p className="mt-3">Enter Amount</p>
                  <input type="text" placeholder="500.00" className="border border-gray-300 p-2 min-w-120"></input>
                </div>
              )}
              
              <button className="mt-3 py-2 cursor-pointer px-4 bg-black text-white font-semibold">{activeTransectionTab}</button>
            </div>
                    
          </div>        
        </div>

        <div className="flex justify-between items-center">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Transactions History</h2>
            <span className="text-gray-600">Your wallet recent activity logs.</span>
          </div>
          <div className="mb-4 bg-white border border-gray-200 p-1">
            <button onClick={() => setActiveTab("All")} className={`py-2 cursor-pointer px-4 hover:bg-[#f1f1f1]  hover:text-black font-semibold ${activeTab === "All" ? "bg-[#f1f1f1] text-black" : ""}`}>All Transactions</button>
            <button onClick={() => setActiveTab("deposit")} className={`ml-2 py-2  cursor-pointer px-15 hover:bg-[#f1f1f1]  hover:text-black font-semibold ${activeTab === "deposit" ? "bg-[#f1f1f1] text-black" : ""}`}>Deposit</button>
            <button onClick={() => setActiveTab("withdraw")} className={`ml-2 py-2 cursor-pointer px-15 hover:bg-[#f1f1f1]  hover:text-black font-semibold ${activeTab === "withdraw" ? "bg-[#f1f1f1] text-black" : ""}`}>Withdraw</button>
          </div>
        </div>
        
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b  bg-gray-300">
              <th className="py-2 pl-3">Txn Id</th>
              <th>Date</th>
              <th>Status</th>
              <th>Description</th>
              <th className="text-right pr-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((tx , index)=> (
              <tr key={index} className={`border-b border-gray-200 px-2 py-2 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                <td className="py-2 pl-3">
                  <p className="text-sm font-medium">{tx.activity_id}</p>
                  {/* <p className="text-xs text-gray-500">{new Date(tx.date_modified).toDateString()}</p> */}
                </td>
                <td>{new Date(tx.date_modified).toDateString()}</td>
                <td>{tx.status.slice(0, 1).toUpperCase() + tx.status.slice(1)}</td>
                <td>{tx.descr.slice(0, 1).toUpperCase() + tx.descr.slice(1)}</td>
                <td className={`text-right pr-3 font-semibold ${tx.descr === "deposit" ? "text-green-600" : "text-red-500"}`}>
                  {tx.descr === "deposit" ? "+" : "-"} {tx.descr === "deposit" ? tx.closing : tx.expense}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default WalletSection;