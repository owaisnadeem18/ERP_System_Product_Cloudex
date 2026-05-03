import DataTable from "@/components/general/DataTable";
import Button from "@/components/ui/Button";
import { Plus, Users, Search, Filter } from "lucide-react";

export default function CustomerMaster() {
 

    const customerData = [
  { id: "CUST-001", name: "Ali Ahmed", contact: "0300-1234567", status: 1 },
  { id: "CUST-002", name: "Zainab Khan", contact: "0321-7654321", status: 1 },
  { id: "CUST-003", name: "Sara Shaikh", contact: "0345-9988776", status: 0 },
  { id: "CUST-004", name: "Bilal Mansoor", contact: "0312-4455667", status: 1 },
  { id: "CUST-005", name: "Hamza Siddiqui", contact: "0333-1122334", status: 1 },
  { id: "CUST-006", name: "Ayesha Malik", contact: "0322-9988771", status: 0 },
  { id: "CUST-007", name: "Usman Ghani", contact: "0301-5544332", status: 1 },
  { id: "CUST-008", name: "Mariam Abbas", contact: "0344-7766554", status: 1 },
  { id: "CUST-009", name: "Faisal Qureshi", contact: "0321-2233445", status: 0 },
  { id: "CUST-010", name: "Nida Yasir", contact: "0315-8877665", status: 1 },
  { id: "CUST-011", name: "Omer Farooq", contact: "0300-6655443", status: 1 },
  { id: "CUST-012", name: "Sana Javed", contact: "0331-4433221", status: 0 },
  { id: "CUST-013", name: "Mustafa Kamal", contact: "0345-1234500", status: 1 },
  { id: "CUST-014", name: "Kiran Shah", contact: "0324-5566778", status: 1 },
  { id: "CUST-015", name: "Raza Ali", contact: "0302-9900881", status: 0 },
];


  const columns = ["ID", "Name", "Contact", "Status"];

  return (
    <div className="p-1 space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section with Stats/Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#0C6263]/10 rounded-xl">
            <Users className="text-[#0C6263]" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Customer Master
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Manage your client database and track their activity status.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            {/* Search/Filter placeholders - later logic add kar sakte hain */}
            <div className="hidden sm:flex items-center bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl text-gray-400 focus-within:border-[#0C6263] transition-all">
                <Search size={18} />
                <input type="text" placeholder="Search customer..." className="bg-transparent border-none outline-none px-2 text-sm text-gray-700 w-40" />
            </div>
            
            <Button 
                icon={Plus} 
                text="Add Customer" 
                
            />
        </div>
      </div>

      {/* Quick Summary Cards (Optional but adds value) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Total Customers</span>
            <span className="text-xl font-bold text-[#0C6263]">1,284</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Active</span>
            <span className="text-xl font-bold text-[#0C925E]">1,150</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Inactive</span>
            <span className="text-xl font-bold text-red-500">134</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable columns={columns} data={customerData} />
      </div>
      
    </div>
  );
}