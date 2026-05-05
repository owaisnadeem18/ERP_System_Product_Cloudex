"use client";
import React, { useState } from "react";
import { X, Plus, Trash2, Package, Warehouse, Truck } from "lucide-react";

const CreateGRNModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    supplier: "",
    warehouse: "",
    items: [{ product: "", orderedQty: "", receivedQty: "", damagedQty: "" }],
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const addItemRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { product: "", orderedQty: "", receivedQty: "", damagedQty: "" }],
    }));
  };

  const removeItemRow = (index) => {
    if (formData.items.length > 1) {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, items: updatedItems }));
    }
  };

  const inputClass = "w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4  bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Create Goods Received Note</h2>
            <p className="text-sm text-gray-500">Inventory Management / New GRN</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Top Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Truck size={16} /> Supplier Name
              </label>
              <input
                name="supplier"
                placeholder="Search or enter supplier"
                value={formData.supplier}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Warehouse size={16} /> Destination Warehouse
              </label>
              <input
                name="warehouse"
                placeholder="Select warehouse"
                value={formData.warehouse}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Items Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Package size={18} /> Item Details
              </h3>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <div className="col-span-4">Product Description</div>
              <div className="col-span-2 text-center">Ordered</div>
              <div className="col-span-2 text-center">Received</div>
              <div className="col-span-2 text-center">Damaged</div>
              <div className="col-span-2"></div>
            </div>

            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="col-span-4">
                    <input
                      placeholder="Product Name/SKU"
                      value={item.product}
                      onChange={(e) => handleItemChange(index, "product", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="0"
                      value={item.orderedQty}
                      onChange={(e) => handleItemChange(index, "orderedQty", e.target.value)}
                      className={`${inputClass} text-center`}
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="0"
                      value={item.receivedQty}
                      onChange={(e) => handleItemChange(index, "receivedQty", e.target.value)}
                      className={`${inputClass} text-center border-blue-200 bg-blue-50/30`}
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="0"
                      value={item.damagedQty}
                      onChange={(e) => handleItemChange(index, "damagedQty", e.target.value)}
                      className={`${inputClass} text-center border-red-100 focus:ring-red-400`}
                    />
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button 
                      onClick={() => removeItemRow(index)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={addItemRow} 
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-md transition-all"
            >
              <Plus size={18} /> Add Another Item
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 px-6 py-4  bg-gray-50">
          <button 
            onClick={onClose} 
            className="px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Discard
          </button>
          <button 
            onClick={() => onSave(formData)} 
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-md shadow-blue-200 transition-all active:scale-95"
          >
            Complete GRN
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateGRNModal;