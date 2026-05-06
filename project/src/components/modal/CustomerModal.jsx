"use client";
import React from 'react';
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerSchema } from '@/lib/validations';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CustomerModal = ({ isOpen, onClose, onSave }) => {
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
      status: "1",
    }
  });

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (formData) => {
    const finalCustomer = {
      ...formData,
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      status: Number(formData.status), // String to Number conversion
    };
    
    onSave(finalCustomer);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-50 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Add New Customer</h3>
          <button onClick={handleClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-4">
            <Input 
              label="Full Name"
              name="name"
              register={register}
              placeholder="Owais Nadeem"
              error={errors.name}
              // Label automatic black ayega agar Input me default logic sahi hai
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Contact Number"
                name="contact"
                register={register}
                placeholder="+92 3xx xxxxxxx"
                error={errors.contact}
              />
              
              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-600 font-medium">Status</label>
                <select 
                  {...register("status")}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:border-[#0C6263] outline-none text-gray-700 text-sm"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-xs text-red-500 ml-1">{errors.status.message}</p>
                )}
              </div>
            </div>

            <Input 
              label="Email Address (Optional)"
              type="email"
              name="email"
              register={register}
              placeholder="example@mail.com"
              error={errors.email}
            />
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end gap-3">
            <button 
              type="button"
              onClick={handleClose} 
              className="px-6 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
            <Button 
              type="submit"
              text="Save Customer" 
              className="shadow-lg shadow-teal-900/10" 
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;