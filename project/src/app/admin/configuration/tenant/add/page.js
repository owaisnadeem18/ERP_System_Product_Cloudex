"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import TenantForm from '@/components/forms/TenantForm';

/**
 * AddTenantPage Component
 * Handles the creation of new tenant configurations.
 */
const AddTenantPage = () => {
  const router = useRouter();

  // Function to handle the saving of new tenant data
  const handleSave = (newTenant) => {
    // 1. Fetch existing tenants from local storage
    const savedData = localStorage.getItem('tenant_configs');
    const existingData = savedData ? JSON.parse(savedData) : [];
    
    // 2. Add the new tenant to the beginning of the array
    const updatedData = [newTenant, ...existingData];
    
    // 3. Save the updated list back to local storage
    localStorage.setItem('tenant_configs', JSON.stringify(updatedData));
    
    console.log("Tenant Registered Successfully!");
    
    // 4. Redirect the user back to the Tenant Master list
    router.push('/admin/configuration/tenant');
  };

  return (
    <div className="page-container py-10 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="py-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Register New Tenant
        </h1>
        <p className="text-slate-500">
          Setup a new system entity with unique branding, contact, and tax configurations.
        </p>
      </div>

      {/* Form Section */}
      <div className="mt-4">
        <TenantForm
          onSave={handleSave} 
          onCancel={() => router.back()} 
        />
      </div>
    </div>
  );
};

export default AddTenantPage;