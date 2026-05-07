"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { grnData } from '@/lib/data/grnData'; // Aapka mock data
import GRNForm from '@/components/forms/GRNForm';

const EditGRNPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [grnToEdit, setGrnToEdit] = useState(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('inventoryGrns') || "[]");
    
    const allGrns = [...localData, ...grnData];
    
    // 3. Find by grnId (URL parameter)
    const found = allGrns.find(g => g.grnId === id);
    
    if (found) {
      const preparedData = {
        ...found,
        warehouse: found.warehouse?.name || found.warehouse,
        itemsCount: found.items?.length || 0, 
        date: found.grnDate ? new Date(found.grnDate).toISOString().split('T')[0] : ""
      };
      setGrnToEdit(preparedData);
    }
  }, [id]);

  const handleUpdate = (updatedGRN) => {
    const localGrns = JSON.parse(localStorage.getItem('inventoryGrns') || "[]");
    
    const filteredLocal = localGrns.filter(g => g.grnId !== updatedGRN.grnId);
    
    const dataToSave = {
      ...updatedGRN,
      grnDate: updatedGRN.date || new Date().toISOString(),
    };

    const updatedList = [dataToSave, ...filteredLocal];
    localStorage.setItem('inventoryGrns', JSON.stringify(updatedList));
    
    router.push('/admin/inventory/grns');
  };

  if (!grnToEdit) return <div className="p-10 text-center animate-pulse">Loading GRN...</div>;

  return (
    <div className="page-container py-10 bg-slate-50 min-h-screen">
      <div className="py-4">
        <h1 className="text-2xl font-bold text-slate-800">Edit GRN</h1>
        <p className="text-slate-500">Modify details for <span className="font-semibold text-teal-700">{id}</span></p>
      </div>

      <GRNForm 
        initialData={grnToEdit} 
        onSave={handleUpdate} 
        onCancel={() => router.back()} 
      />
    </div>
  );
};

export default EditGRNPage;