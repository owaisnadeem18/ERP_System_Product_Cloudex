"use client";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tenantSchema } from '@/lib/validations';
import { Building2, Hash, Phone, MapPin, Globe, ShieldCheck, Percent } from "lucide-react";
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';

const TenantForm = ({ initialData, onSave, onCancel }) => {
  const isEditMode = !!initialData;

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(tenantSchema),
    defaultValues: {
      code: "",
      name: "",
      contact: "",
      location: "",
      url: "",
      status: 1,
      isTaxApplicable: false,
      taxNumber: ""
    }
  });

  const isTaxChecked = watch("isTaxApplicable");

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = (formData) => {
    const finalData = {
      ...formData,
      id: initialData?.id || `TEN-${Date.now()}`,
      // Audit fields auto-manage
      createdAt: initialData?.createdAt || new Date().toISOString(),
      createdBy: initialData?.createdBy || "Admin",
      modifiedAt: new Date().toISOString(),
      modifiedBy: "Admin",
      isDeleted: 0
    };
    onSave(finalData);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="sm:px-6 px-4 md:px-8 py-6 border-b border-gray-50 bg-slate-50/50">
        <h3 className="text-xl font-bold text-slate-800">
          {isEditMode ? "Update Tenant Configuration" : "Register New Tenant"}
        </h3>
        <p className="text-sm text-slate-500 mt-1">Configure system-level tenant identity and access points.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="sm:p-6 p-4 md:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input label="Tenant Code" name="code" register={register} error={errors.code} icon={Hash} placeholder="e.g. TNT-001" />
          <Input label="Tenant Name" name="name" register={register} error={errors.name} icon={Building2} placeholder="e.g. Alpha Corp" />
          <Input label="Contact" name="contact" register={register} error={errors.contact} icon={Phone} placeholder="e.g. +92 300..." />
          <Input label="Location" name="location" register={register} error={errors.location} icon={MapPin} placeholder="City, Country" />
          <Input label="Tenant URL" name="url" register={register} error={errors.url} icon={Globe} placeholder="https://tenant.erp.com" />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-700 font-semibold">Status</label>
            <select {...register("status")} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:border-[#0C6263]">
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
        </div>

        {/* Reusable Checkbox and Conditional Input */}
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
           <Checkbox 
             label="Is this tenant tax registered?" 
             name="isTaxApplicable" 
             register={register} 
           />
           
           {isTaxChecked && (
             <div className="animate-in slide-in-from-top-2 duration-300 max-w-sm">
                <Input 
                  label="Tax/NTN Number" 
                  name="taxNumber" 
                  register={register} 
                  error={errors.taxNumber} 
                  icon={Percent} 
                  placeholder="e.g. 1234567-8"
                />
             </div>
           )}
        </div>

        <div className="flex sm:justify-end gap-4 pt-6 border-t border-gray-50 flex-col sm:flex-row">
          <Button type="button" onClick={onCancel} text="Cancel" className="bg-white! text-slate-500! border-gray-200!" />
          <Button type="submit" text={isEditMode ? "Update Tenant" : "Save Configuration"} className="px-10 shadow-lg shadow-teal-900/10" />
        </div>
      </form>
    </div>
  );
};

export default TenantForm;