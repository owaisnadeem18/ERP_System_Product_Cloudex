import React from "react";

const page = () => {
  return (
    <>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Dashboard
      </h2>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
          <h4 className="text-gray-500 text-sm">Total Products</h4>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-green-500">
          <h4 className="text-gray-500 text-sm">Customers</h4>
          <p className="text-2xl font-bold text-green-600">80</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-purple-500">
          <h4 className="text-gray-500 text-sm">Today's Sales</h4>
          <p className="text-2xl font-bold text-purple-600">PKR 25,000</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-red-500">
          <h4 className="text-gray-500 text-sm">Low Stock</h4>
          <p className="text-2xl font-bold text-red-600">12 Items</p>
        </div>

      </div>

      {/* 🔹 Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold mb-4">Recent Orders</h3>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th>Order</th>
                <th>Customer</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>Ali</td>
                <td>PKR 2,000</td>
              </tr>
              <tr>
                <td>#002</td>
                <td>Ahmed</td>
                <td>PKR 3,500</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Low Stock */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold mb-4">Low Stock Products</h3>

          <ul className="text-sm space-y-2">
            <li className="flex justify-between">
              <span>Product A</span>
              <span className="text-red-500">5 left</span>
            </li>
            <li className="flex justify-between">
              <span>Product B</span>
              <span className="text-red-500">3 left</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 🔹 Quick Actions */}
      <div className="mt-6 bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold mb-4">Quick Actions</h3>

        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-500">
            Add Product
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-500">
            Add Customer
          </button>
        </div>
      </div>

    </>
  );
};

export default page;