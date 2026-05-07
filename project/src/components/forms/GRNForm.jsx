"use client";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { grnSchema } from '@/lib/validations';
import { Truck, Warehouse, Package, Calendar, CheckCircle2 } from "lucide-react";
import Input from '../ui/Input';
import Button from '../ui/Button';

const GRNForm = ({ initialData, onSave, onCancel }) => {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(grnSchema),
    defaultValues: {
      supplier: "",
      warehouse: "",
      itemsCount: "",
      status: "Received",
      date: new Date().toISOString().split('T')[0], 
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        // Handling nested mock data or direct local data
        warehouse: initialData.warehouse?.name || initialData.warehouse || "",
        itemsCount: initialData.items ? initialData.items.length : (initialData.itemsCount || ""),
        date: (initialData.grnDate || initialData.date) 
          ? new Date(initialData.grnDate || initialData.date).toISOString().split('T')[0] 
          : "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = (formData) => {
    // Generate ID only if it's a new entry, otherwise keep the old one
    const finalGRN = {
      ...formData,
      // Logic: Edit mode mein wahi id/grnId rakho, naye mein generate karo
      id: initialData?.id || `GRN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      grnId: initialData?.grnId || `GRN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      grnDate: new Date(formData.date).toISOString(), // Format consistent with mock data
    };
    
    onSave(finalGRN);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Form Header */}
      <div className="sm:px-6 px-4 md:px-8 py-6 border-b border-gray-50 bg-slate-50/50">
        <h3 className="text-xl font-bold text-slate-800">
          {isEditMode ? "Update GRN Details" : "Create New Goods Receipt"}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          {isEditMode 
            ? `Editing record for ${initialData?.grnId}` 
            : "Fill in the shipment details. GRN ID will be generated automatically."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="sm:p-6 p-4 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Input 
            label="Supplier Name"
            name="supplier"
            register={register}
            placeholder="e.g. Tech Distributors"
            error={errors.supplier}
            icon={Truck}
          />

          <Input 
            label="Target Warehouse"
            name="warehouse"
            register={register}
            placeholder="e.g. Karachi Central"
            error={errors.warehouse}
            icon={Warehouse}
          />

          <Input 
            label="Total Items Count"
            name="itemsCount"
            type="number"
            register={register}
            placeholder="e.g. 50"
            error={errors.itemsCount}
            icon={Package}
          />

          <Input 
            label="Date of Receipt"
            name="date"
            type="date"
            register={register}
            error={errors.date}
            icon={Calendar}
          />

          {/* Status Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-700 font-semibold">Status</label>
            <div className="relative">
              <select 
                {...register("status")}
                className={`w-full px-4 py-2.5 border rounded-xl bg-white shadow-sm focus:border-[#0C6263] outline-none text-gray-700 text-sm transition-all appearance-none ${
                  errors.status ? "border-red-500" : "border-gray-200"
                }`}
              >
                <option value="Completed">Completed</option>
                <option value="Partial">Partial</option>
                <option value="Pending">Pending</option>
              </select>
              <div className="absolute right-3 top-3 pointer-events-none">
                <CheckCircle2 className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Footer */}
        <div className="flex sm:justify-end gap-4 sm:pt-8 border-t border-gray-50 mt-8 flex-col sm:flex-row">
          <Button 
            type="button"
            onClick={onCancel} 
            text="Discard"
            className="bg-gray-50! text-slate-500! border-gray-200!"
          />
          
          <Button 
            type="submit"
            text={isEditMode ? "Update GRN" : "Save GRN"} 
            className="px-10 shadow-xl shadow-teal-900/10" 
          />
        </div>
      </form>
    </div>
  );
};

export default GRNForm;