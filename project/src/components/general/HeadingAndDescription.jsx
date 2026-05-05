import React from 'react'

const HeadingAndDescription = ({ title, description }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">

        {/* Left Side Title */}
        <div className="space-y-1">
          <h2 className="heading-spacing">{title}</h2>

          <p className="text-muted max-w-xl">
            {description}
          </p>
        </div>

      </div>
  )
}

export default HeadingAndDescription
