"use client";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Building, MapPin, Phone, User, Globe, Hash, Percent } from "lucide-react";
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import { branchSchema } from '@/lib/validations';

const BranchForm = ({ initialData, onSave, onCancel, tenants = [] }) => {
  const isEditMode = !!initialData;

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(branchSchema),
    defaultValues: {
      status: 1,
      isTaxApplicable: false,
      tenantId: "",
    }
  });

  const isTaxChecked = watch("isTaxApplicable");

  // Populate form in Edit Mode
  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = (formData) => {
    // Find the selected tenant name to store it denormalized for the table
    const selectedTenant = tenants.find(t => t.id === formData.tenantId);
    
    const finalBranch = {
      ...formData,
      id: initialData?.id || `BR-${Math.floor(10000 + Math.random() * 90000)}`,
      tenantName: selectedTenant?.name || "Unknown Tenant",
      createdAt: initialData?.createdAt || new Date().toISOString(),
      createdBy: initialData?.createdBy || "Admin",
      modifiedAt: new Date().toISOString(),
      modifiedBy: "Admin",
      isDeleted: 0
    };
    
    onSave(finalBranch);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className="sm:p-6 p-4 md:p-8 space-y-8">
        
        {/* Section 1: Hierarchy & Identity */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Tenant Selection Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-700 font-semibold flex items-center gap-2">
              <Building size={16} className="text-slate-400" /> Parent Tenant
            </label>
            <select 
              {...register("tenantId")}
              className={`w-full px-4 py-2.5 border rounded-xl bg-white shadow-sm focus:border-[#0C6263] outline-none text-gray-700 text-sm transition-all ${
                errors.tenantId ? "border-red-500" : "border-gray-200"
              }`}
            >
              <option value="">Select Tenant (Owner)</option>
              {tenants.map((t) => (
                <option key={t.id} value={t.id}>{t.name} ({t.code})</option>
              ))}
            </select>
            {errors.tenantId && <p className="text-xs text-red-500 ml-1">{errors.tenantId.message}</p>}
          </div>

          <Input label="Branch Name" name="name" register={register} error={errors.name} icon={MapPin} placeholder="e.g. Gulshan Branch" />
          <Input label="Branch Code" name="code" register={register} error={errors.code} icon={Hash} placeholder="e.g. IMT-KHI-01" />
        </div>

        {/* Section 2: Contact & Personnel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input label="Branch Manager" name="manager" register={register} error={errors.manager} icon={User} placeholder="Full Name" />
          <Input label="Contact Number" name="contact" register={register} error={errors.contact} icon={Phone} placeholder="e.g. 021-xxxxxxx" />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-700 font-semibold">City</label>
            <select {...register("city")} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:border-[#0C6263]">
              <option value="">Select City</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
            </select>
            {errors.city && <p className="text-xs text-red-500 ml-1">{errors.city.message}</p>}
          </div>
        </div>

        {/* Section 3: Full Address */}
        <Input label="Full Physical Location" name="location" register={register} error={errors.location} icon={Globe} placeholder="House #, Street, Area..." />

        {/* Section 4: Tax Configuration (The Conditional Part) */}
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
           <Checkbox 
             label="This branch has separate Tax Registration" 
             name="isTaxApplicable" 
             register={register} 
           />
           
           {isTaxChecked && (
             <div className="animate-in slide-in-from-top-2 duration-300 max-w-sm">
                <Input 
                  label="Branch Tax/NTN Number" 
                  name="taxNumber" 
                  register={register} 
                  error={errors.taxNumber} 
                  icon={Percent} 
                  placeholder="e.g. 1234567-8"
                />
             </div>
           )}
        </div>

        {/* Form Actions */}
        <div className="flex sm:justify-end gap-4 pt-6 border-t border-gray-50 flex-col sm:flex-row">
          <Button type="button" onClick={onCancel} text="Discard" className="bg-white! text-slate-500! border-gray-200!" />
          <Button type="submit" text={isEditMode ? "Update Branch" : "Register Branch"} className="px-10 shadow-lg shadow-teal-900/10" />
        </div>
      </form>
    </div>
  );
};

export default BranchForm;