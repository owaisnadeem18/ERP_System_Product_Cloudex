"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { inventoryAdjustments } from '@/lib/data/inventoryAdjustments';
import AdjustmentForm from '@/components/forms/AdjustmentForm';

const EditAdjustmentPage = () => {
  const router = useRouter();
  const { id } = useParams(); // This captures the adjustmentId from the URL
  const [adjustmentToEdit, setAdjustmentToEdit] = useState(null);

  useEffect(() => {
    // 1. Get data from localStorage
    const localData = JSON.parse(localStorage.getItem('inventoryAdjustments') || "[]");
    
    // 2. Combine with mock data for searching
    const allAdjustments = [...localData, ...inventoryAdjustments];
    
    // 3. Find the specific adjustment by ID
    // Note: Checking both 'id' and 'adjustmentId' to be safe
    const found = allAdjustments.find(a => a.adjustmentId === id || a.id === id);
    
    setAdjustmentToEdit(found);
  }, [id]);

  const handleUpdate = (updatedAdjustment) => {
    const localAdjustments = JSON.parse(localStorage.getItem('inventoryAdjustments') || "[]");
    
    // Remove the old version if it exists in local storage
    const filteredLocal = localAdjustments.filter(a => 
      a.adjustmentId !== updatedAdjustment.adjustmentId && a.id !== updatedAdjustment.id
    );
    
    // Add the updated version to the top
    const updatedList = [updatedAdjustment, ...filteredLocal];
    
    localStorage.setItem('inventoryAdjustments', JSON.stringify(updatedList));
    
    console.log("Adjustment Updated Successfully!");
    router.push('/admin/inventory/adjustments');
  };

  if (!adjustmentToEdit) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-pulse text-slate-500 font-medium">
          Loading Adjustment Details...
        </div>
      </div>
    );
  }

  return (
    <div className="page-container py-10 bg-slate-50 min-h-screen">
      <div className="py-4">
        <h1 className="text-2xl font-bold text-slate-800">Edit Inventory Adjustment</h1>
        <p className="text-slate-500">Update the details for reference {id}</p>
      </div>

      <AdjustmentForm 
        initialData={adjustmentToEdit} 
        onSave={handleUpdate} 
        onCancel={() => router.back()} 
      />
    </div>
  );
};

export default EditAdjustmentPage;