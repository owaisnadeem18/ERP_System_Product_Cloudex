"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import AdjustmentForm from '@/components/forms/AdjustmentForm';

const AddAdjustmentPage = () => {
  const router = useRouter();

  const handleSave = (newAdjustment) => {
    const existingData = JSON.parse(localStorage.getItem('inventoryAdjustments') || "[]");
    const updatedData = [newAdjustment, ...existingData];
    localStorage.setItem('inventoryAdjustments', JSON.stringify(updatedData));
    
    console.log("Adjustment Recorded Successfully!");
    router.push('/admin/inventory/adjustments');
  };

  return (
    <div className="page-container py-10 bg-slate-50 min-h-screen">
      <div className="py-4">
        <h1 className="text-2xl font-bold text-slate-800">Inventory Adjustment</h1>
        <p className="text-slate-500">Log stock corrections and audits</p>
      </div>

      <AdjustmentForm
        onSave={handleSave} 
        onCancel={() => router.back()} 
      />
    </div>
  );
};

export default AddAdjustmentPage;