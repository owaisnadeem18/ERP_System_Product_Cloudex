"use client";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { warehouseSchema } from '@/lib/validations';
import { Building2, MapPin, User, Phone } from "lucide-react";
import Input from '../ui/Input';
import Button from '../ui/Button';

const WarehouseForm = ({ initialData, onSave, onCancel }) => {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(warehouseSchema),
    defaultValues: {
      name: "",
      location: "",
      manager: "",
      contact: "",
      status: "1",
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (formData) => {
    const finalWarehouse = {
      ...formData,
      id: initialData?.id || `WH-${Math.floor(1000 + Math.random() * 9000)}`,
      updatedAt: new Date().toISOString(),
    };
    onSave(finalWarehouse);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="sm:px-6 px-4 md:px-8 py-6 border-b border-gray-50 bg-slate-50/50">
        <h3 className="text-xl font-bold text-slate-800">
          {isEditMode ? "Update Warehouse Details" : "Register New Warehouse"}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          {isEditMode ? "Edit the warehouse location and management info." : "Add a new storage facility to your network."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="sm:p-6 p-4 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Warehouse Name"
            name="name"
            register={register}
            placeholder="e.g. Central Karachi Depot"
            error={errors.name}
            icon={Building2}
          />
          
          <Input 
            label="Warehouse Manager"
            name="manager"
            register={register}
            placeholder="e.g. John Doe"
            error={errors.manager}
            icon={User}
          />

          <Input 
            label="Contact Number"
            name="contact"
            register={register}
            placeholder="e.g. 0213456789"
            error={errors.contact}
            icon={Phone}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-700 font-semibold">Status</label>
            <select 
              {...register("status")}
              className={`w-full px-4 py-2.5 border rounded-xl bg-white shadow-sm focus:border-[#0C6263] outline-none text-gray-700 text-sm transition-all ${
                errors.status ? "border-red-500" : "border-gray-200"
              }`}
            >
              <option value="1">Active / Operational</option>
              <option value="0">Inactive / Maintenance</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <Input 
              label="Location Address"
              name="location"
              register={register}
              placeholder="Full address of the warehouse facility..."
              error={errors.location}
              icon={MapPin}
            />
          </div>
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
            text={isEditMode ? "Update Warehouse" : "Save Warehouse"} 
            className="px-10 py-2.5 shadow-xl shadow-teal-900/10" 
          />
        </div>
      </form>
    </div>
  );
};

export default WarehouseForm;