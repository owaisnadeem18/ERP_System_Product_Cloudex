import DataTable from "@/components/general/DataTable";
import Button from "@/components/ui/Button";
import { customerData } from "@/lib/data/customersData";
import { Plus, Users, Search } from "lucide-react";

export default function CustomerMaster() {

  

  const columns = ["ID", "Name", "Contact", "Status"];

  return (
    <div className="page-container space-y-6 animate-in fade-in duration-500">

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">

        {/* Left Side Title */}
        <div className="space-y-1">
          <h2 className="heading-spacing">Customer Master</h2>

          <p className="text-muted max-w-xl">
            Manage your customer database, track status, and maintain relationships efficiently.
          </p>
        </div>

        {/* Actions */}
        <div className="flex sm:items-center gap-3 sm:flex-row flex-col">

          <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl focus-within:border-[#0C6263] transition">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search customer..."
              className="bg-transparent outline-none text-sm w-40"
            />
          </div>

          <Button icon={Plus} text="Add Customer" />
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="section flex justify-between items-center">
          <span className="text-muted">Total Customers</span>
          <span className="text-xl font-bold text-[#0C6263]">{customerData.length}</span>
        </div>

        <div className="section flex justify-between items-center">
          <span className="text-muted">Active</span>
          <span className="text-xl font-bold text-green-600">{customerData.filter((c) => c.status === 1).length}</span>
        </div>

        <div className="section flex justify-between items-center">
          <span className="text-muted">Inactive</span>
          <span className="text-xl font-bold text-red-500">{customerData.filter((c) => c.status === 0).length}</span>
        </div>

      </div>

        <div className="flex items-center justify-between mb-4">

          <h3 className="heading-section">Customer List</h3>

          


        </div>

        <DataTable columns={columns} data={customerData} />


    </div>
  );
}