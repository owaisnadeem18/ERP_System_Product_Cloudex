"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  
  // Master Data Group
  { 
    name: 'Masters', 
    href: '#',
    subLinks: [
      { name: 'Product Master', href: '/admin/masters/products' },
      { name: 'Customer Master', href: '/admin/masters/customers' },
      { name: 'Warehouses', href: '/admin/masters/warehouses' },
    ]
  },

  // POS Screen - Direct link because it's used frequently
  { name: 'POS', href: '/admin/pos' },

  // Inventory Management
  { 
    name: 'Inventory', 
    href: '#',
    subLinks: [
      { name: 'Inventory Transfers', href: '/admin/inventory/transfers' },
      { name: 'Inventory Adjustment', href: '/admin/inventory/adjustments' },
      { name: 'GRNs (Good Receipt)', href: '/admin/inventory/grns' },
    ]
  },

  // Purchasing Module
  { 
    name: 'Purchasing', 
    href: '#',
    subLinks: [
      { name: 'Purchase Orders', href: '/admin/purchasing/orders' },
      { name: 'AP Invoices', href: '/admin/purchasing/ap-invoices' },
      { name: 'Outgoing Payments', href: '/admin/purchasing/payments' },
    ]
  },

  // Sales & Finance
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
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <div className="shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Owaisify<span className="text-blue-600">.</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-4 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const hasSublinks = !!link.subLinks;

              return (
                <div key={link.name} className="relative group h-full flex items-center">
                  <Link 
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1
                      ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    {link.name}
                    
                    {/* Arrow Dropdown Icon for Nested Items */}
                    {hasSublinks && (
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}

                    {/* Active Route Underline (80% width) */}
                    {isActive && (
                      <span className="absolute bottom-0 left-[10%] w-[80%] h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </Link>

                  {/* Dropdown Menu (Animated on Hover) */}
                  {hasSublinks && (
                    <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 transition-all duration-300 z-50">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
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

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-blue-600 transition">🔔</button>
            <div className="h-8 w-8 rounded-full bg-linear-to-tr from-blue-600 to-indigo-400 border-2 border-white shadow-sm" />
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-auto transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen border-b' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link
                href={link.href}
                onClick={() => !link.subLinks && setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-xl"
              >
                {link.name}
              </Link>
              {link.subLinks && (
                <div className="pl-8 space-y-1">
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