"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { customerData } from '@/lib/data/customersData';
import CustomerForm from '@/components/forms/CustomerForm';

const EditCustomerPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [customerToEdit, setCustomerToEdit] = useState(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('customers') || "[]");
    
    const allCustomers = [...localData, ...customerData];
    
    const found = allCustomers.find(c => c.id === id);
    setCustomerToEdit(found);
  }, [id]);

  const handleUpdate = (updatedCustomer) => {
  const localCustomers = JSON.parse(localStorage.getItem('customers') || "[]");
  
  const filteredLocal = localCustomers.filter(c => c.id !== updatedCustomer.id);
  
  const updatedList = [updatedCustomer, ...filteredLocal];
  
  localStorage.setItem('customers', JSON.stringify(updatedList));
  router.push('/admin/masters/customers');
};

  if (!customerToEdit) return <p className="p-10 text-center">Loading Customer Details...</p>;

  return (
    <div className="page-container py-10">
      <CustomerForm 
        initialData={customerToEdit} 
        onSave={handleUpdate} 
        onCancel={() => router.back()} 
      />
    </div>
  );
};

export default EditCustomerPage;