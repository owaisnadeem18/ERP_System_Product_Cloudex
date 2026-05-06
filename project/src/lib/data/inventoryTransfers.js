export const inventoryTransfers = [
  {
    id: "trf_001",
    transferNumber: "TRF-2026-001",
    sourceWarehouse: { id: "w1", name: "Main Warehouse (Karachi)" },
    destinationWarehouse: { id: "w2", name: "Sub-Branch (Lahore)" },
    itemsCount: 5,
    totalQuantity: 150,
    status: "Completed",
    transferredBy: "Owais Nadeem",
    transferDate: "2026-05-01T10:30:00Z",
    priority: "High"
  },
  {
    id: "trf_002",
    transferNumber: "TRF-2026-002",
    sourceWarehouse: { id: "w2", name: "Sub-Branch (Lahore)" },
    destinationWarehouse: { id: "w1", name: "Main Warehouse (Karachi)" },
    itemsCount: 2,
    totalQuantity: 40,
    status: "In-Transit",
    transferredBy: "Ali Ahmed",
    transferDate: "2026-05-04T14:15:00Z",
    priority: "Medium"
  },
  {
    id: "trf_003",
    transferNumber: "TRF-2026-003",
    sourceWarehouse: { id: "w3", name: "Islamabad Depot" },
    destinationWarehouse: { id: "w2", name: "Sub-Branch (Lahore)" },
    itemsCount: 12,
    totalQuantity: 600,
    status: "Pending",
    transferredBy: "Owais Nadeem",
    transferDate: "2026-05-05T09:00:00Z",
    priority: "Low"
  },
  {
    id: "trf_004",
    transferNumber: "TRF-2026-004",
    sourceWarehouse: { id: "w1", name: "Main Warehouse (Karachi)" },
    destinationWarehouse: { id: "w3", name: "Islamabad Depot" },
    itemsCount: 8,
    totalQuantity: 220,
    status: "Cancelled",
    transferredBy: "Sana Khan",
    transferDate: "2026-04-28T11:20:00Z",
    priority: "High"
  },
  {
    id: "trf_005",
    transferNumber: "TRF-2026-005",
    sourceWarehouse: { id: "w2", name: "Sub-Branch (Lahore)" },
    destinationWarehouse: { id: "w3", name: "Islamabad Depot" },
    itemsCount: 3,
    totalQuantity: 85,
    status: "In-Transit",
    transferredBy: "Owais Nadeem",
    transferDate: "2026-05-05T13:45:00Z",
    priority: "Medium"
  },
  
];
