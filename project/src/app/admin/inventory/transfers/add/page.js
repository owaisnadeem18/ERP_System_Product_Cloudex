"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import CustomerForm from '@/components/forms/CustomerForm';
import TransfersForm from '@/components/forms/TransfersForm';

const AddTransferPage = () => {
  const router = useRouter();

 const handleSave = (newTransfer) => {
    const existingData = JSON.parse(localStorage.getItem('transfers') || "[]");
    const updatedData = [newTransfer, ...existingData];
    localStorage.setItem('transfers', JSON.stringify(updatedData));

    console.log("Transfer Saved Successfully!");
    router.push('/admin/inventory/transfers');
  };

  
  return (
    <div className="page-container py-10 bg-slate-50 min-h-screen">
      <div className="py-4">
        <h1 className="text-2xl font-bold text-slate-800">Transfers Master Management</h1>
        <p className="text-slate-500">Add transfers to your database</p>
      </div>

      <TransfersForm
        onSave={handleSave} 
        onCancel={() => router.back()} 
      />
    </div>
  );
};

export default AddTransferPage;