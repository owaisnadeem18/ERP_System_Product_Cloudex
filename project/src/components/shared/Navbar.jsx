"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cloudexBigLogo } from '@/app/assets';
import { User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/admin/dashboard' },
    { 
      name: 'Masters', 
      href: '#',
      subLinks: [
        { name: 'Product Master', href: '/admin/masters/products' },
        { name: 'Customer Master', href: '/admin/masters/customers' },
        { name: 'Warehouses', href: '/admin/masters/warehouses' },
      ]
    },
    { name: 'POS', href: '/admin/pos' },
    { 
      name: 'Inventory', 
      href: '#',
      subLinks: [
        { name: 'Inventory Transfers', href: '/admin/inventory/transfers' },
        { name: 'Inventory Adjustment', href: '/admin/inventory/adjustments' },
        { name: 'GRNs', href: '/admin/inventory/grns' },
      ]
    },
    { 
      name: 'Purchasing', 
      href: '#',
      subLinks: [
        { name: 'Purchase Orders', href: '/admin/purchasing/orders' },
        { name: 'AP Invoices', href: '/admin/purchasing/ap-invoices' },
        { name: 'Outgoing Payments', href: '/admin/purchasing/payments' },
      ]
    },
    { 
      name: 'Finance', 
      href: '#',
      subLinks: [
        { name: 'AR Invoices', href: '/admin/finance/ar-invoices' },
        { name: 'Incoming Payments', href: '/admin/finance/payments' },
      ]
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 shadow-lg bg-linear-to-r from-[#0C6263] to-[#0C925E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}

          <div className="shrink-0 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-xl shadow-sm">
  <Image 
    src={cloudexBigLogo} 
    alt="Cloudex Logo" 
    width={110} 
    height={35} 
    className="h-auto w-auto" 
    priority 
  />
</div>

          {/* Desktop Links (Visible on LG screens) */}
          <div className="hidden lg:flex items-center gap-2 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.subLinks && link.subLinks.some(sub => pathname.startsWith(sub.href))); ;
              const hasSublinks = !!link.subLinks;

              return (
                
                <div key={link.name} className="relative group h-full flex items-center">
  <Link 
    href={link.href}
    className={`relative px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 group/link
      ${isActive 
        ? 'text-white ' 
        : 'text-white/80 hover:text-white hover:bg-white/10'
      }`}
  >
    {link.name}
    
    {/* Refined Arrow Icon */}
    {hasSublinks && (
      <svg 
        className={`w-4 h-4 transition-transform duration-300 group-hover:rotate-180 
          ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} 
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )}

    {/* Elegant Bottom Underline with Glow */}
    {isActive && (
      <span className="absolute -bottom-px left-[10%] w-[80%] h-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
    )}
  </Link>

  {/* Dropdown Menu - Darker Teal to Match or Clean White */}
  {hasSublinks && (
    <div className="absolute top-full left-0 w-52 bg-white border border-gray-100 shadow-2xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 translate-y-3 transition-all duration-300 z-50">
      {link.subLinks.map((sub) => {

        const isSubActive = pathname === sub.href;
       
        return (

          <Link
  key={sub.name}
  href={sub.href}
  className={`block px-4 py-2.5 text-sm font-medium transition-all duration-200
    ${isSubActive 
      ? 'bg-[#0C6263]/10 text-[#0C6263] border-l-4 border-[#0C6263]' 
      : 'text-gray-600 hover:bg-gray-50 hover:text-[#0C6263]'
    }`}
>
  {sub.name}
</Link>
          
        )
      })}
    </div>
  )}
</div>

              );
            })}
          </div>

          {/* Right Side - Avatar & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* User Profile Dropdown (Visible on ALL screens) */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center focus:outline-none"
              >
                <div className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xs font-bold transition-all duration-300 group-hover:bg-white/30 group-hover:scale-105 shadow-lg">
                  <User  />
                </div>
              </button>

              {/* Profile Popover / Dropdown */}
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl py-3 z-20 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-2">
                      <p className="text-sm font-bold text-gray-900">Cloudex ERP System</p>
                      <p className="text-xs text-gray-500 italic">Admin</p>
                    </div>
                    <Link href="/admin/profile" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">My Profile</Link>
                    <Link href="/admin/settings" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">Account Settings</Link>
                    <hr className="my-2 border-gray-50" />
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 font-semibold hover:bg-red-50 transition-colors">
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Hamburger (Visible on < LG) */}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden overflow-auto transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen border-b' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-8 space-y-1 bg-white shadow-inner">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link
                href={link.href}
                onClick={() => !link.subLinks && setIsOpen(false)}
                className={`block px-4 py-3 text-base font-semibold rounded-xl ${pathname === link.href ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
              >
                {link.name}
              </Link>
              {link.subLinks && (
                <div className="pl-8 space-y-1 mt-1">
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-500 hover:text-blue-600"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}