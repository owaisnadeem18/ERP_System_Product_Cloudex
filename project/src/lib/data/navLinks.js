export const navLinks = [
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
    { 
      name: 'Configuration', 
      href: '#',
      subLinks: [
        { name: 'Tenant Configuration', href: '/admin/configuration/tenant' },
        { name: 'Branch Configuration', href: '/admin/configuration/branch' },
      ]
    },
  ];