import Image from 'next/image';
import React from 'react';
import { authDesktopImg, authMobileImg } from '@/assets';

// In Next.js, layouts receive 'children' instead of using <Outlet />
export default function AuthLayout({ children }) {
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-y-hidden">

      {/* Left Side - Background Image (Visible on Desktop) */}
      <div className="hidden md:block md:w-1/2 h-screen relative">
        <Image
          src= {authDesktopImg}
          alt="Auth Background"
          className="w-full h-full object-cover"
        />
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Right Side - Content Area */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative px-4 md:px-0">

        {/* Mobile Background (Visible on Small Screens) */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={authMobileImg}
            alt="Auth Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mobile Overlay */}
        <div className="absolute inset-0 bg-black/40 md:hidden"></div>

        {/* Form Content: This renders your login/register page.js */}
        <div className="relative z-10 w-full">
          <div className='min-h-screen flex items-center justify-center md:bg-linear-to-br md:from-primary-green md:via-[#6FB8C9] md:to-primary-blue  sm:px-0 md:px-8 lg:px-4' >
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}