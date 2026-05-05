"use client";

import React, { useState } from "react";
import { Search, ShoppingCart, User, Package, Trash2, Plus, Minus, CreditCard, Coins, CoinsIcon } from "lucide-react";
import Button from "../ui/Button";
import PaymentModal from "../modal/PaymentModal";

const productsData = [
  { id: "PROD-001", name: "Wireless Mouse", price: 1200, stock: 45 },
  { id: "PROD-002", name: "Mechanical Keyboard", price: 4500, stock: 12 },
  { id: "PROD-003", name: "Dell Monitor", price: 28500, stock: 8 },
  { id: "PROD-004", name: "USB Cable", price: 500, stock: 100 },
];

export default function POSScreen() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [paymentModal , setPaymentModal] = useState(false);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, type) => {
    setCart(cart.map((item) => {
      if (item.id === id) {
        const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-screen">


        <PaymentModal
            amount={total}
            isOpen={paymentModal}
            onClose={() => setPaymentModal(false)}
        />

      {/* LEFT */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="bg-white p-3 rounded-xl flex items-center gap-2 shadow">
          <Search className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product..."
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 ">

{

            filteredProducts.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-10">
                No products found.
              </div>
            )

}

          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => addToCart(p)}
              className="bg-white p-3 rounded-xl shadow hover:shadow-lg cursor-pointer"
            >
              <div className="h-24 bg-gray-100 flex items-center justify-center rounded mb-2">
                <Package />
              </div>
              <h4 className="text-sm font-bold">{p.name}</h4>
              <p className="text-xs text-gray-500">Stock: {p.stock}</p>
              <p className="font-bold text-green-600">Rs {p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white rounded-xl shadow flex flex-col">
        <div className="p-4 bg-linear-to-r from-[#0C6263] to-[#0C925E] text-white flex justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart /> Order
          </div>
          <span>#001</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <h5 className="text-sm font-bold">{item.name}</h5>
                <p className="text-xs">Rs {item.price} x {item.qty}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, "dec")}><Minus size={14} /></button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, "inc")}><Plus size={14} /></button>
                <button onClick={() => removeItem(item.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{tax.toFixed(0)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{total.toFixed(0)}</span>
          </div>
          <Button icon={CoinsIcon} onClick={() => setPaymentModal(true)} text={"Pay Now"} type="text"  />

        </div>
      </div>
    </div>
  );
}
