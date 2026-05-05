

import { useState } from 'react';
import Button from '../ui/Button';

const PaymentModal = ({ isOpen, onClose, amount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-bold text-gray-800">Confirm Payment</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>Total Amount:</span>
            <span className="font-semibold text-gray-900">${amount}</span>
          </div>
          <p className="text-sm text-gray-500">
            By clicking confirm, your payment will be processed securely.
          </p>
        </div>

        <div className="mt-8 flex gap-3">
          <Button
            onClick={onClose}
            text={"Cancel"}
            className="flex-1 px-4 py-2 border bg-transparent text-black! hover:text-black hover:bg-gray-200 transition-all"
          
          />
          <Button
            onClick={() => alert('Processing Payment...')}
            text={"Confirm & Pay"}
            className="flex-1 px-4 py-2 shadow-lg shadow-blue-200 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;