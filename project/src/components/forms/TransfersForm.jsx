"use client";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { transferSchema } from '@/lib/validations';
import { ArrowRightLeft, Calendar, Warehouse, Package, ClipboardList } from "lucide-react";
import Input from '../ui/Input';
import Button from '../ui/Button';

const TransfersForm = ({ initialData, onSave, onCancel }) => {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transferSchema),
    defaultValues: {
      transferDate: new Date().toISOString().split('T')[0],
      fromWarehouse: "",
      toWarehouse: "",
      itemDetails: "",
      quantity: 1,
      remarks: "",
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (formData) => {
    const finalTransfer = {
      ...formData,
      id: initialData?.id || `TRF-${Math.floor(10000 + Math.random() * 90000)}`,
      status: initialData?.status || "Pending",
    };
    onSave(finalTransfer);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="sm:px-6 px-4 md:px-8 py-6 border-b border-gray-50 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#0C6263] rounded-lg">
            <ArrowRightLeft className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              {isEditMode ? "Edit Stock Transfer" : "New Stock Transfer"}
            </h3>
            <p className="text-sm text-slate-500 mt-1 text-nowrap">Move inventory between warehouse locations.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="sm:p-6 p-4 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Input 
            label="Transfer Date"
            name="transferDate"
            type="date"
            register={register}
            error={errors.transferDate}
            icon={Calendar}
          />

          {/* From Warehouse Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-700 font-semibold flex items-center gap-2">
              <Warehouse size={14} /> Source Warehouse
            </label>
            <select 
              {...register("fromWarehouse")}
              className={`w-full px-4 py-2.5 border rounded-xl bg-white shadow-sm focus:border-[#0C6263] outline-none text-gray-700 text-sm transition-all ${
                errors.fromWarehouse ? "border-red-500" : "border-gray-200"
              }`}
            >
              <option value="">Select Source</option>
              <option value="Main Warehouse">Main Warehouse</option>
              <option value="Karachi Hub">Karachi Hub</option>
              <option value="Lahore Depot">Lahore Depot</option>
            </select>
            {errors.fromWarehouse && <p className="text-xs text-red-500">{errors.fromWarehouse.message}</p>}
          </div>

          {/* To Warehouse Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-700 font-semibold flex items-center gap-2">
              <Warehouse size={14} /> Destination Warehouse
            </label>
            <select 
              {...register("toWarehouse")}
              className={`w-full px-4 py-2.5 border rounded-xl bg-white shadow-sm focus:border-[#0C6263] outline-none text-gray-700 text-sm transition-all ${
                errors.toWarehouse ? "border-red-500" : "border-gray-200"
              }`}
            >
              <option value="">Select Destination</option>
              <option value="Main Warehouse">Main Warehouse</option>
              <option value="Karachi Hub">Karachi Hub</option>
              <option value="Lahore Depot">Lahore Depot</option>
            </select>
            {errors.toWarehouse && <p className="text-xs text-red-500">{errors.toWarehouse.message}</p>}
          </div>

          <Input 
            label="Item Name / SKU"
            name="itemDetails"
            register={register}
            placeholder="e.g. Samsung S24 Ultra"
            error={errors.itemDetails}
            icon={Package}
          />

          <Input 
            label="Quantity"
            name="quantity"
            type="number"
            register={register}
            placeholder="0"
            error={errors.quantity}
            icon={ClipboardList}
          />

          <Input 
            label="Remarks (Optional)"
            name="remarks"
            register={register}
            placeholder="Reason for transfer..."
            error={errors.remarks}
          />
        </div>

        {/* Footer */}
        <div className="flex sm:justify-end gap-4 sm:pt-8 border-t border-gray-50 mt-8 flex-col sm:flex-row">
          <Button 
            type="button"
            onClick={onCancel} 
            className="px-8 py-2.5 text-sm font-bold text-slate-500! bg-gray-50! border border-gray-200!"
            text="Discard"
          />
          
          <Button 
            type="submit"
            text={isEditMode ? "Update Transfer" : "Initiate Transfer"} 
            className="px-10 py-2.5 shadow-xl shadow-teal-900/10" 
          />
        </div>
      </form>
    </div>
  );
};

export default TransfersForm;