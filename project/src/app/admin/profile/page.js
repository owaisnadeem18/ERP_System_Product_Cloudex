"use client";
import React from 'react';
import { User, Mail, Shield, MapPin, Briefcase, Calendar } from "lucide-react";

const AdminProfile = () => {
  // Mock data based on your project context
  const adminData = {
    name: "Faisal Shahzad", // Professional associate from your context
    role: "System Administrator",
    email: "faisal.shahzad@cloudex.com",
    location: "Karachi, Pakistan",
    experience: "Software House Admin",
    joined: "January 2026",
    status: "Active"
  };

  return (
    <div className="page-container flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="space-y-1">
        <h2 className="heading-spacing text-2xl font-bold text-slate-800">Admin Profile</h2>
        <p className="text-muted max-w-xl">
          View and manage your account settings and administrative permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="w-32 h-32 bg-[#0C6263]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-md">
              <User size={64} className="text-[#0C6263]" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{adminData.name}</h3>
            <p className="text-sm font-medium text-[#0C6263] bg-[#0C6263]/10 px-3 py-1 rounded-full inline-block mt-2">
              {adminData.role}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={18} className="text-gray-400" />
                <span>{adminData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin size={18} className="text-gray-400" />
                <span>{adminData.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info & Stats */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Professional Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Briefcase size={20} className="text-[#0C6263]" /> Professional Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Experience Level</p>
                <p className="text-slate-700 font-medium">{adminData.experience}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Member Since</p>
                <p className="text-slate-700 font-medium">{adminData.joined}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Account Status</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {adminData.status}
                </span>
              </div>
            </div>
          </div>

          {/* Permissions / Access Levels */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Shield size={20} className="text-[#0C6263]" /> System Permissions
            </h4>
            <div className="flex flex-wrap gap-3">
              {["Manage Inventory", "User Control", "Finance Access", "Report Generation"].map((perm) => (
                <span key={perm} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-600">
                  {perm}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;