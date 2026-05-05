import React from 'react'

const DataStatsInfo = ({ title, totalLength, activeLength, inactiveLength }) => {
  return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="section flex justify-between items-center">
          <span className="text-muted">{title}</span>
          <span className="text-xl font-bold text-[#0C6263]">{totalLength}</span>
        </div>

        <div className="section flex justify-between items-center">
          <span className="text-muted">Active</span>
          <span className="text-xl font-bold text-green-600">{activeLength}</span>
        </div>

        <div className="section flex justify-between items-center">
          <span className="text-muted">Inactive</span>
          <span className="text-xl font-bold text-red-500">{inactiveLength}</span>
        </div>

      </div>

  )
}

export default DataStatsInfo
