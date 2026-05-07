"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import GRNForm from '@/components/forms/GRNForm';


const AddGRNPage = () => {
  const router = useRouter();

  // Function to handle form submission
  const handleSave = (newGRN) => {
    const savedData = localStorage.getItem('inventoryGrns');
    const existingData = savedData ? JSON.parse(savedData) : [];
    
    const updatedData = [newGRN, ...existingData];
    
    localStorage.setItem('inventoryGrns', JSON.stringify(updatedData));
    
    console.log("GRN Created Successfully!");
    
    router.push('/admin/inventory/grns');
  };

  return (
    <div className="page-container py-10 bg-slate-50 min-h-screen">
      <div className="py-4">
        <h1 className="text-2xl font-bold text-slate-800">
          New Goods Received Note
        </h1>
        <p className="text-slate-500">
          Document the receipt of physical goods from a supplier into your inventory.
        </p>
      </div>

      <div className="mt-4">
        <GRNForm
          onSave={handleSave} 
          onCancel={() => router.back()} 
        />
      </div>
    </div>
  );
};

export default AddGRNPage;