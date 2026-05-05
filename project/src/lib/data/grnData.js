export const grnData = [
  {
    grnId: "GRN-2026-001",
    supplier: "Tech Distributors Ltd",
    warehouse: { id: "w1", name: "Main Warehouse (Karachi)" },
    status: "Completed",
    receivedBy: "Owais Nadeem",
    grnDate: "2026-05-05T10:00:00Z",
    items: [
      {
        product: { id: "p101", name: "Laptop Dell XPS" },
        orderedQty: 10,
        receivedQty: 10,
        damagedQty: 0
      },
      {
        product: { id: "p205", name: "Wireless Mouse" },
        orderedQty: 50,
        receivedQty: 48,
        damagedQty: 2
      }
    ]
  },
  {
    grnId: "GRN-2026-002",
    supplier: "Global IT Supplies",
    warehouse: { id: "w2", name: "Sub-Branch (Lahore)" },
    status: "Partial",
    receivedBy: "Ali Ahmed",
    grnDate: "2026-05-06T14:30:00Z",
    items: [
      {
        product: { id: "p310", name: "LED Monitor 24\"" },
        orderedQty: 20,
        receivedQty: 15,
        damagedQty: 1
      }
    ]
  },
  {
    grnId: "GRN-2026-003",
    supplier: "Future Tech Traders",
    warehouse: { id: "w3", name: "Islamabad Depot" },
    status: "Pending",
    receivedBy: "Sana Khan",
    grnDate: "2026-05-07T09:15:00Z",
    items: [
      {
        product: { id: "p401", name: "Mechanical Keyboard" },
        orderedQty: 30,
        receivedQty: 0,
        damagedQty: 0
      }
    ]
  }
];