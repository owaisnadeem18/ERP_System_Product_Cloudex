import StatsCard from "@/components/dashboard/StatsCard";
import StatsTable from "@/components/dashboard/StatsTable";
import { statsData } from "@/lib/data/statsData";
import React from "react";

const page = () => {
  return (
    
    <div className="page-container">

  {/* Heading */}
  <h2 className="heading-spacing">Dashboard</h2>

  {/* Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
    {statsData?.map((stat) => (
      <StatsCard key={stat.id} {...stat} />
    ))}
  </div>

  {/* Tables */}
  <StatsTable/>

  {/* Quick Actions */}
  <div className="section mt-6">
    <h3 className="heading-spacing">Quick Actions</h3>

    <div className="flex flex-wrap gap-3">
      <button className="btn btn-primary">Add Product</button>
      <button className="btn btn-success">Add Customer</button>
    </div>
  </div>

</div>

  );
};

export default page;