import React from "react";

const StatsTable = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* 🔹 Recent Orders */}
      <div className="section">

        <h3 className="heading-spacing">Recent Orders</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* Header */}
            <thead>
<tr className="text-left border-b border-gray-100 bg-gray-100 hover:bg-gray-200 transition">
                <th className="py-3 px-2 font-medium">Order</th>
                <th className="py-3 px-2 font-medium">Customer</th>
                <th className="py-3 px-2 font-medium">Amount</th>
            
              </tr>
            
            </thead>


            {/* Body */}
            <tbody className="divide-y divide-gray-100">

              <tr className="hover:bg-gray-50 transition">
                <td className="py-3 px-2 font-semibold text-gray-700">#001</td>
                <td className="py-3 px-2 text-gray-600">Ali</td>
                <td className="py-3 px-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    PKR 2,000
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition">
                <td className="py-3 px-2 font-semibold text-gray-700">#002</td>
                <td className="py-3 px-2 text-gray-600">Ahmed</td>
                <td className="py-3 px-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    PKR 3,500
                  </span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>

      {/* 🔹 Low Stock Products */}
      <div className="section">

        <h3 className="heading-spacing">Low Stock Products</h3>

        <ul className="space-y-3">

          <li className="flex items-center justify-between p-3 rounded-xl bg-red-50 hover:bg-red-100 transition">
            <span className="font-medium text-gray-700">Product A</span>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-600">
              5 left
            </span>
          </li>

          <li className="flex items-center justify-between p-3 rounded-xl bg-red-50 hover:bg-red-100 transition">
            <span className="font-medium text-gray-700">Product B</span>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-600">
              3 left
            </span>
          </li>

        </ul>

      </div>

    </div>
  );
};

export default StatsTable;