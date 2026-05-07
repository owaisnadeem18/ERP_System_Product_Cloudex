"use client";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { adjustmentSchema } from '@/lib/validations';
import { Box, Warehouse, Hash, FileText, ClipboardCheck, ArrowUpDown } from "lucide-react";
import Input from '../ui/Input';
import Button from '../ui/Button';

const AdjustmentForm = ({ initialData, onSave, onCancel }) => {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adjustmentSchema),
    defaultValues: {
      warehouse: "",
      product: "",
      type: "Addition",
      quantity: "",
      reason: "",
      status: "Pending",
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        // If your mock data has objects, we extract the name for the text input
        warehouse: initialData.warehouse?.name || initialData.warehouse || "",
        product: initialData.product?.name || initialData.product || "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = (formData) => {
    const finalAdjustment = {
      ...formData,
      // Maintaining the structure of your mock data
      id: initialData?.id || `ADJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      adjustmentId: initialData?.adjustmentId || `ADJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      adjustmentDate: initialData?.adjustmentDate || new Date().toISOString(),
      adjustedBy: initialData?.adjustedBy || "Owais Nadeem", // Current User
    };
    
    onSave(finalAdjustment);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="sm:px-6 px-4 md:px-8 py-6 border-b border-gray-50 bg-slate-50/50">
        <h3 className="text-xl font-bold text-slate-800">
          {isEditMode ? "Update Inventory Adjustment" : "Create New Adjustment"}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          {isEditMode ? "Modify the stock correction details." : "Record a new stock addition or subtraction."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="sm:p-6 p-4 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Input 
            label="Warehouse"
            name="warehouse"
            register={register}
            placeholder="e.g. Main Warehouse"
            error={errors.warehouse}
            icon={Warehouse}
          />
          
          <Input 
            label="Product Name"
            name="product"
            register={register}
            placeholder="e.g. Laptop Dell XPS"
            error={errors.product}
            icon={Box}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-700 font-semibold">Adjustment Type</label>
            <div className="relative">
              <select 
                {...register("type")}
                className={`w-full px-4 py-2.5 border rounded-xl bg-white shadow-sm focus:border-[#0C6263] outline-none text-gray-700 text-sm transition-all appearance-none ${
                  errors.type ? "border-red-500" : "border-gray-200"
                }`}
              >
                <option value="Addition">Addition (+)</option>
                <option value="Subtraction">Subtraction (-)</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <Input 
            label="Quantity"
            name="quantity"
            type="number"
            register={register}
            placeholder="e.g. 10"
            error={errors.quantity}
            icon={Hash}
          />

          <Input 
            label="Reason"
            name="reason"
            register={register}
            placeholder="e.g. Damaged during transit"
            error={errors.reason}
            icon={FileText}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-700 font-semibold">Status</label>
            <div className="relative">
              <select 
                {...register("status")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-sm focus:border-[#0C6263] outline-none text-gray-700 text-sm transition-all appearance-none"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <ClipboardCheck className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex sm:justify-end sm:items-center gap-4 sm:pt-8 border-t border-gray-50 mt-8 flex-col sm:flex-row">
          <Button 
            type="button"
            onClick={onCancel} 
            className="px-8 py-2.5 text-sm font-bold text-slate-500! hover:text-slate-800! transition-colors bg-gray-50! border border-gray-200! shadow-sm hover:bg-gray-100!"
            text="Discard"
           />
          
          <Button 
            type="submit"
            text={isEditMode ? "Update Adjustment" : "Save Adjustment"} 
            className="px-10 py-2.5 shadow-xl shadow-teal-900/10" 
          />
        </div>
      </form>
    </div>
  );
};

export default AdjustmentForm;