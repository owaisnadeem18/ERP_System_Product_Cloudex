import { Package, Users, ShoppingCart, AlertTriangle } from "lucide-react";

export const statsData = [
  {
    id: 1,
    title: "Total Products",
    value: "120",
    color: "bg-blue-500",
    icon: <Package size={20} />,
  },
  {
    id: 2,
    title: "Customers",
    value: "80",
    color: "bg-green-500",
    icon: <Users size={20} />,
  },
  {
    id: 3,
    title: "Today's Sales",
    value: "PKR 25,000",
    color: "bg-purple-500",
    icon: <ShoppingCart size={20} />,
  },
  {
    id: 4,
    title: "Low Stock",
    value: "12 Items",
    color: "bg-red-500",
    icon: <AlertTriangle size={20} />,
  },
];