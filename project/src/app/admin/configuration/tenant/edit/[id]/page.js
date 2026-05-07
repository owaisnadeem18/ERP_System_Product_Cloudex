"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { tenantData as mockData } from '@/lib/data/tenantConfigData';
import TenantForm from '@/components/forms/TenantForm';

const EditTenantPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [tenantToEdit, setTenantToEdit] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('tenant_configs');
    const localData = savedData ? JSON.parse(savedData) : [];
    
    const allTenants = [...localData, ...mockData];
    
    const found = allTenants.find(t => t.id === id);
    
    if (found) {
      setTenantToEdit(found);
    }
  }, [id]);

  const handleUpdate = (updatedTenant) => {
    const localTenants = JSON.parse(localStorage.getItem('tenant_configs') || "[]");
    
    const filteredLocal = localTenants.filter(t => t.id !== updatedTenant.id);
    
    const updatedList = [updatedTenant, ...filteredLocal];
    
    localStorage.setItem('tenant_configs', JSON.stringify(updatedList));
    
    console.log("Tenant Configuration Updated!");
    router.push('/admin/configuration/tenant');
  };

  if (!tenantToEdit) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-slate-400 animate-pulse font-medium">
          Fetching Tenant Records...
        </div>
      </div>
    );
  }

  return (
    <div className="page-container py-10 bg-slate-50 min-h-screen">
      <div className="py-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Edit Tenant Configuration
        </h1>
        <p className="text-slate-500">
          Modify settings for Tenant ID: <span className="font-mono text-[#0C6263] font-bold">{id}</span>
        </p>
      </div>

      <div className="mt-4">
        <TenantForm 
          initialData={tenantToEdit} 
          onSave={handleUpdate} 
          onCancel={() => router.back()} 
        />
      </div>
    </div>
  );
};

export default EditTenantPage;