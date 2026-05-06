"use client";
import React from 'react';
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // npm install @hookform/resolvers
import { productSchema } from '@/lib/validations';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ProductModal = ({ isOpen, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      barcode: "",
      price: "",
      quantity: "",
      isTaxApplicable: "Yes",
    }
  });

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (formData) => {
    const finalProduct = {
      ...formData,
      id: formData.id || `PROD-${Math.floor(1000 + Math.random() * 9000)}`,
      price: Number(formData.price),
    quantity: Number(formData.quantity),
      isTaxApplicable: formData.isTaxApplicable === "Yes",
      status: 1,
    };
    
    onSave(finalProduct);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-50 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Add New Product</h3>
          <button onClick={handleClose} className="p-2 hover:bg-gray-200/50 rounded-full text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-4">
            <Input 
              label="Product Name"
              name="name"
              register={register}
              placeholder="e.g. Wireless Mouse"
              error={errors.name}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Barcode"
                name="barcode"
                register={register}
                placeholder="12345678"
                error={errors.barcode}
              />
              <Input 
                label="Price"
                type="number"
                name="price"
                register={register}
                placeholder="0.00"
                error={errors.price}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Quantity"
                type="number"
                name="quantity"
                register={register}
                placeholder="0"
                error={errors.quantity}
              />
              
              {/* Select Field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-600 font-medium">Tax Applicable</label>
                <select 
                  {...register("isTaxApplicable")}
                  className={`w-full px-3 py-3 border rounded-xl bg-white shadow-sm focus:border-[#0C6263] outline-none text-gray-700 text-sm transition-all ${
                    errors.isTaxApplicable ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.isTaxApplicable && (
                  <p className="text-xs text-red-500 ml-1">{errors.isTaxApplicable.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end gap-3">
            <button 
              type="button"
              onClick={handleClose} 
              className="px-6 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <Button 
              type="submit"
              text="Save Product" 
              className="shadow-lg shadow-teal-900/10" 
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;