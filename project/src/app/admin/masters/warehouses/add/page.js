"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import WarehouseForm from '@/components/forms/WarehouseForm';

const AddWarehousePage = () => {
  const router = useRouter();

  const handleSave = (newWarehouse) => {
    console.log("Saving to Database/State:", newWarehouse);

    const existingData = JSON.parse(localStorage.getItem('warehouses') || "[]");

    const updatedData = [newWarehouse, ...existingData]

    localStorage.setItem('warehouses', JSON.stringify(updatedData));

    router.push('/admin/masters/warehouses');

  };

  return (
    <div className="page-container py-10 bg-slate-50 min-h-screen">
      <div className="py-4">
        <h1 className="text-2xl font-bold text-slate-800">Warehouses Master Management</h1>
        <p className="text-slate-500">Add warehouses to your global inventory</p>
      </div>

      <WarehouseForm
        onSave={handleSave} 
        onCancel={() => router.back()} 
      />
    </div>
  );
};

export default AddWarehousePage;