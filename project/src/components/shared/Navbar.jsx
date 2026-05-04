"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cloudexBigLogo } from '@/assets';
import { User, ChevronDown, Menu, X } from 'lucide-react'; // Icons clean rakhein
import { navLinks } from '@/lib/data/navLinks';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState(null); // Mobile sub-menu state
  const pathname = usePathname();

  // Helper function to check if a link or its children are active
  const checkActive = (link) => {
    if (pathname === link.href) return true;
    return link.subLinks?.some(sub => pathname.startsWith(sub.href));
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 shadow-lg bg-linear-to-r from-[#0C6263] to-[#0C925E] text-white">
      {/* Fluid container for better dashboard width */}
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <div className="shrink-0 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-xl shadow-sm">
            <Image src={cloudexBigLogo} alt="Logo" width={110} height={35} priority />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 h-full">
            {navLinks.map((link) => {
              const isActive = checkActive(link);
              return (
                <div key={link.name} className="relative group h-full flex items-center">
                  <Link 
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5
                      ${isActive ? 'text-white' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
                  >
                    {link.name}
                    {link.subLinks && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 opacity-70" />}
                    {isActive && <span className="absolute bottom-3 left-4 right-4 h-0.5 bg-white rounded-full shadow-[0_0_8px_white]" />}
                  </Link>

                  {/* Desktop Dropdown */}
                  {link.subLinks && (
                    <div className="absolute top-[80%] left-0 w-52 bg-white border border-gray-100 shadow-2xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-2 transition-all duration-200 z-50">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`block px-4 py-2.5 text-sm font-medium ${pathname === sub.href ? 'bg-teal-50 text-[#0C6263] border-l-4 border-[#0C6263]' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Profile Dropdown logic remains same but container updated */}
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="h-9 w-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all shadow-md">
                <User size={20} />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl py-3 z-20 animate-in fade-in zoom-in duration-200 text-gray-800">
                   <div className="px-4 py-2 border-b border-gray-50 mb-2">
                      <p className="text-sm font-bold">Cloudex ERP System</p>
                      <p className="text-xs text-gray-500">Admin </p>
                   </div>
                   <Link href="/admin/profile" className="block px-4 py-2 text-sm hover:bg-gray-50">Profile</Link>
                   <Link href="/login" className="block px-4 py-2 text-sm text-red-600 font-bold hover:bg-red-50">Logout</Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 hover:bg-white/10 rounded-lg">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Refined */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-white px-4 py-6 space-y-2 border-t text-gray-800">
          {navLinks.map((link) => {
            const isActive = checkActive(link);
            return (
              <div key={link.name} className="space-y-1">
                <div 
                  className={`flex justify-between items-center px-4 py-3 rounded-xl font-bold transition-colors
                    ${isActive ? 'bg-teal-50 text-[#0C6263]' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => link.subLinks ? setActiveMobileSub(activeMobileSub === link.name ? null : link.name) : setIsOpen(false)}
                >
                  {link.subLinks ? <span>{link.name}</span> : <Link href={link.href} className="w-full">{link.name}</Link>}
                  {link.subLinks && <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileSub === link.name ? 'rotate-180' : ''}`} />}
                </div>

                {/* Mobile Sub-links (Collapsible) */}
                {link.subLinks && activeMobileSub === link.name && (
                  <div className="pl-6 space-y-1 py-1 border-l-2 border-teal-100 ml-4">
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-2.5 text-sm rounded-lg ${pathname === sub.href ? 'text-[#0C6263] font-bold bg-teal-50/50' : 'text-gray-500'}`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}