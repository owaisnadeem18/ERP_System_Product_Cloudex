"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BranchForm from '@/components/forms/BranchForm';
import { tenantData } from '@/lib/data/tenantConfigData';

const AddBranchPage = () => {
  const router = useRouter();
  const [tenants, setTenants] = useState([]);

  // Load Tenants to pass to the form dropdown
  useEffect(() => {
    const savedTenants = localStorage.getItem('tenant_configs');
    const localTenants = savedTenants ? JSON.parse(savedTenants) : [];
    
    // Combine mock and local tenants so the user can pick from any existing tenant
    const combinedTenants = [
      ...localTenants,
      ...tenantData.filter(m => !localTenants.some(l => l.id === m.id))
    ];
    setTenants(combinedTenants);
  }, []);

  const handleSave = (newBranch) => {
    // 1. Get existing branches
    const savedBranches = localStorage.getItem('branch_configs');
    const existingBranches = savedBranches ? JSON.parse(savedBranches) : [];
    
    // 2. Add new branch to the list
    const updatedBranches = [newBranch, ...existingBranches];
    
    // 3. Persist to LocalStorage
    localStorage.setItem('branch_configs', JSON.stringify(updatedBranches));
    
    // 4. Redirect back to Master
    router.push('/admin/configuration/branch');
  };

  return (
    <div className="page-container py-10 bg-slate-50 min-h-screen">
      <div className="py-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Create New Branch
        </h1>
        <p className="text-slate-500">
          Assign a new physical location to an existing Tenant and configure its details.
        </p>
      </div>

      <div className="mt-4">
        {/* We pass the tenants list so the form can show a "Select Tenant" dropdown */}
        <BranchForm 
          tenants={tenants}
          onSave={handleSave} 
          onCancel={() => router.back()} 
        />
      </div>
    </div>
  );
};

export default AddBranchPage;