"use client";
import React from 'react';
import { X, Warehouse, MapPin, User, Phone } from 'lucide-react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { warehouseSchema } from '@/lib/validations';
import Input from '../ui/Input';
import Button from '../ui/Button';

const WarehouseModal = ({ isOpen, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(warehouseSchema),
    defaultValues: {
      name: '',
      location: '',
      manager: '',
      phone: '',
      status: '1'
    }
  });

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      id: `WH-${Math.floor(1000 + Math.random() * 9000)}`,
      status: Number(data.status), 
    };
    onSave(finalData);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-lg">
              <Warehouse className="text-[#0C6263]" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Add New Warehouse</h3>
              <p className="text-xs text-slate-500">Enter details to create a new storage location.</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          
          <Input
            label="Warehouse Name"
            name="name"
            register={register}
            placeholder="e.g. Main Karachi Warehouse"
            error={errors.name}
            icon={Warehouse}
          />

          <Input
            label="Location / Address"
            name="location"
            register={register}
            placeholder="e.g. Korangi Industrial Area"
            error={errors.location}
            icon={MapPin}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Manager Name"
              name="manager"
              register={register}
              placeholder="Ahmed Khan"
              error={errors.manager}
              icon={User}
            />
            
            <Input 
              label="Contact Number"
              name="phone"
              register={register}
              placeholder="03xx-xxxxxxx"
              error={errors.phone}
              icon={Phone}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Status</label>
            <select 
              {...register("status")}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0C6263] bg-white shadow-sm"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button 
              type="button" 
              onClick={handleClose}
              className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <Button 
              text="Save Warehouse" 
              type="submit"
              className="font-bold px-8 shadow-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default WarehouseModal;