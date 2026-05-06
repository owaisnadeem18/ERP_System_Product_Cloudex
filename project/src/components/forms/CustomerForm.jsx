"use client";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerSchema } from '@/lib/validations';
import { Package, Barcode, DollarSign, Box } from "lucide-react";
import Input from '../ui/Input';
import Button from '../ui/Button';

const CustomerForm = ({ initialData, onSave, onCancel }) => {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      city: "",
      isTaxApplicable: "Yes",
      status: "1",
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        isTaxApplicable: initialData.isTaxApplicable === true || initialData.isTaxApplicable === "Yes" ? "Yes" : "No"
      });
    }
  }, [initialData, reset]);

  const onSubmit = (formData) => {
    const finalCustomer = {
      ...formData,
      id: initialData?.id || `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      status: initialData?.status || 1,
    };
    
    onSave(finalCustomer);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Form Header */}
      <div className="sm:px-6 px-4 md:px-8 py-6 border-b border-gray-50 bg-slate-50/50">
        <h3 className="text-xl font-bold text-slate-800">
          {isEditMode ? "Update Customer Information" : "Create New Customer"}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          {isEditMode ? "Modify the existing customer details below." : "Fill in the details to add a new customer to your database."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="sm:p-6 p-4 md:p-8  space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input 
            label="Customer Name"
            name="name"
            register={register}
            placeholder="e.g. John Doe"
            error={errors.name}
            icon={Package}
          />
          
          <Input 
            label="Contact Number"
            name="contact"
            register={register}
            placeholder="e.g. 03001234567"
            error={errors.contact}
            icon={Barcode}
          />

          <Input 
            label="Email Address"
            type="email"
            name="email"
            register={register}
            placeholder="e.g. john.doe@example.com"
            error={errors.email}
            icon={DollarSign}
          />

          <Input 
            label="City"
            name="city"
            register={register}
            placeholder="e.g. Karachi"
            error={errors.city}
            icon={Box}

          />

          {/* Select Field for Tax */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-700 font-semibold">Tax Applicable</label>
            <select 
              {...register("isTaxApplicable")}
              className={`w-full px-4 py-2.5 border rounded-xl bg-white shadow-sm focus:border-[#0C6263] outline-none text-gray-700 text-sm transition-all ${
                errors.isTaxApplicable ? "border-red-500" : "border-gray-200"
              }`}
            >
              <option value="Yes">Yes, Apply Tax</option>
              <option value="No">No, Tax Free</option>
            </select>
            {errors.isTaxApplicable && (
              <p className="text-xs text-red-500 ml-1">{errors.isTaxApplicable.message}</p>
            )}
          </div>
        </div>

        {/* Form Footer */}
        <div className="flex sm:justify-end sm:items-center gap-4 sm:pt-8 border-t border-gray-50 mt-8 flex-col sm:flex-row">
          <Button 
            type="button"
            onClick={onCancel} 
            className="px-8 py-2.5 text-sm font-bold text-slate-500! hover:text-slate-800! transition-colors bg-gray-50! border border-gray-200! shadow-sm hover:bg-gray-100!"
            text={"Discard"}
           />
            
          
          <Button 
            type="submit"
            text={isEditMode ? "Update Customer" : "Save Customer"} 
            className="px-10 py-2.5 shadow-xl shadow-teal-900/10" 
          />
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;