"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { customerData } from '@/lib/data/customersData';
import CustomerForm from '@/components/forms/CustomerForm';
import TransfersForm from '@/components/forms/TransfersForm';
import { inventoryTransfers } from '@/lib/data/inventoryTransfers';

const EditTransferPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [transferToEdit, setTransferToEdit] = useState(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('transfers') || "[]");
    
    const allTransfers = [...localData, ...inventoryTransfers];
    
    const found = allTransfers.find(t => t.transferNumber === id);
    console.log("Found transfer for editing:", found);
    console.log("Id is " , id)
    setTransferToEdit(found);
  }, [id]);

  const handleUpdate = (updatedTransfer) => {
  const localTransfers = JSON.parse(localStorage.getItem('transfers') || "[]");
  
  const filteredLocal = localTransfers.filter(t => t.transferNumber !== updatedTransfer.transferNumber);
  
  const updatedList = [updatedTransfer, ...filteredLocal];
  
  localStorage.setItem('transfers', JSON.stringify(updatedList));
  router.push('/admin/masters/transfers');
};

  if (!transferToEdit) return <p className="p-10 text-center">Loading Transfer Details...</p>;

  return (
    <div className="page-container py-10">
      <TransfersForm
        initialData={transferToEdit} 
        onSave={handleUpdate} 
        onCancel={() => router.back()} 
      />
    </div>
  );
};

export default EditTransferPage;