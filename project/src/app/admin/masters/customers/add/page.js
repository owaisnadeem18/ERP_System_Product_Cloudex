"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import CustomerForm from '@/components/forms/CustomerForm';

const AddCustomerPage = () => {
  const router = useRouter();

 const handleSave = (newCustomer) => {
    const existingData = JSON.parse(localStorage.getItem('customers') || "[]");
    const updatedData = [newCustomer, ...existingData];
    localStorage.setItem('customers', JSON.stringify(updatedData));
    
    console.log("Customer Saved Successfully!");
    router.push('/admin/masters/customers');
  };

  
  return (
    <div className="page-container py-10 bg-slate-50 min-h-screen">
      <div className="py-4">
        <h1 className="text-2xl font-bold text-slate-800">Customers Master Management</h1>
        <p className="text-slate-500">Add customers to your database</p>
      </div>

      <CustomerForm
        onSave={handleSave} 
        onCancel={() => router.back()} 
      />
    </div>
  );
};

export default AddCustomerPage;