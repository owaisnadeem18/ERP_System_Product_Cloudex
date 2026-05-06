"use client";
import React from 'react';
import ProductForm from '@/components/forms/ProductForm';
import { useRouter } from 'next/navigation';

const AddProductPage = () => {
  const router = useRouter();

  const handleSave = (newProduct) => {
    console.log("Saving to Database/State:", newProduct);

    const existingData = JSON.parse(localStorage.getItem('products') || "[]");

    const updatedData = [newProduct, ...existingData]

    localStorage.setItem('products', JSON.stringify(updatedData));

    router.push('/admin/masters/products');
  };

  return (
    <div className="page-container py-10 bg-slate-50 min-h-screen">
      <div className="py-4">
        <h1 className="text-2xl font-bold text-slate-800">Products Master Management</h1>
        <p className="text-slate-500">Add products to your global inventory</p>
      </div>

      <ProductForm 
        onSave={handleSave} 
        onCancel={() => router.back()} 
      />
    </div>
  );
};

export default AddProductPage;