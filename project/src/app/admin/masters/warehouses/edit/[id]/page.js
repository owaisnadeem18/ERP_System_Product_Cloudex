"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import WarehouseForm from '@/components/forms/WarehouseForm';
import { warehouseData } from '@/lib/data/warehouseData';

const EditWarehousePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [warehouseToEdit, setWarehouseToEdit] = useState(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('warehouses') || "[]");
    
    const allWarehouses = [...localData, ...warehouseData];
    
    // 3. ID se warehouse dhoondo
    const found = allWarehouses.find(w => w.id === id);
    setWarehouseToEdit(found);
  }, [id]);

  const handleUpdate = (updatedWarehouse) => {
  const localWarehouses = JSON.parse(localStorage.getItem('warehouses') || "[]");
  
  const filteredLocal = localWarehouses.filter(w => w.id !== updatedWarehouse.id);
  
  const updatedList = [updatedWarehouse, ...filteredLocal];
  
  localStorage.setItem('warehouses', JSON.stringify(updatedList));
  router.push('/admin/masters/warehouses');
};

  if (!warehouseToEdit) return <p className="p-10 text-center">Loading Warehouse Details...</p>;

  return (
    <div className="page-container py-10">
      <WarehouseForm
        initialData={warehouseToEdit} 
        onSave={handleUpdate} 
        onCancel={() => router.back()} 
      />
    </div>
  );
};

export default EditWarehousePage;