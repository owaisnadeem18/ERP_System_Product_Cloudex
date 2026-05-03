import DataTable from "@/components/ui/DataTable";

export default function CustomerMaster() {
  const customerData = [
    { id: "CUST-001", name: "Ali Ahmed", contact: "0300-1234567", status: 1 },
    { id: "CUST-002", name: "Zainab Khan", contact: "0321-7654321", status: 1 },
    { id: "CUST-003", name: "Sara Shaikh", contact: "0345-9988776", status: 0 },
  ];

  const columns = ["ID", "Name", "Contact", "Status"];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Master</h1>
          <p className="text-gray-500 text-sm">Manage your client database and their status.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200">
          + Add Customer
        </button>
      </div>

      {/* Reusable Table */}
      <DataTable columns={columns} data={customerData} />
    </div>
  );
}