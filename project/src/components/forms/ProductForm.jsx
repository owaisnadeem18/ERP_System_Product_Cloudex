"use client";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from '@/lib/validations';
import { Package, Barcode, DollarSign, Box } from "lucide-react";
import Input from '../ui/Input';
import Button from '../ui/Button';

const ProductForm = ({ initialData, onSave, onCancel }) => {
  const isEditMode = !!initialData;

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

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        isTaxApplicable: initialData.isTaxApplicable === true || initialData.isTaxApplicable === "Yes" ? "Yes" : "No"
      });
    }
  }, [initialData, reset]);

  const onSubmit = (formData) => {
    const finalProduct = {
      ...formData,
      id: initialData?.id || `PROD-${Math.floor(1000 + Math.random() * 9000)}`,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      isTaxApplicable: formData.isTaxApplicable === "Yes",
      status: initialData?.status || 1,
    };
    
    onSave(finalProduct);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Form Header */}
      <div className="px-8 py-6 border-b border-gray-50 bg-slate-50/50">
        <h3 className="text-xl font-bold text-slate-800">
          {isEditMode ? "Update Product Information" : "Create New Product"}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          {isEditMode ? "Modify the existing product details below." : "Fill in the details to add a new product to your inventory."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input 
            label="Product Name"
            name="name"
            register={register}
            placeholder="e.g. Wireless Mouse"
            error={errors.name}
            icon={Package}
          />
          
          <Input 
            label="Barcode / SKU"
            name="barcode"
            register={register}
            placeholder="12345678"
            error={errors.barcode}
            icon={Barcode}
          />

          <Input 
            label="Unit Price (Rs.)"
            type="number"
            name="price"
            register={register}
            placeholder="0.00"
            error={errors.price}
            icon={DollarSign}
          />

          <Input 
            label="Initial Quantity"
            type="number"
            name="quantity"
            register={register}
            placeholder="0"
            error={errors.quantity}
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
        <div className="flex justify-end items-center gap-4 pt-8 border-t border-gray-50 mt-8">
          <button 
            type="button"
            onClick={onCancel} 
            className="px-8 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Discard
          </button>
          <Button 
            type="submit"
            text={isEditMode ? "Update Product" : "Save Product"} 
            className="px-10 py-2.5 shadow-xl shadow-teal-900/10" 
          />
        </div>
      </form>
    </div>
  );
};

export default ProductForm;