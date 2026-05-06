"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductForm from '@/components/forms/ProductForm';
import { productsData } from '@/lib/data/productData';

const EditProductPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('products') || "[]");
    
    const allProducts = [...localData, ...productsData];
    
    // 3. ID se product dhoondo
    const found = allProducts.find(p => p.id === id);
    setProductToEdit(found);
  }, [id]);

  const handleUpdate = (updatedProduct) => {
  const localProducts = JSON.parse(localStorage.getItem('products') || "[]");
  
  const filteredLocal = localProducts.filter(p => p.id !== updatedProduct.id);
  
  const updatedList = [updatedProduct, ...filteredLocal];
  
  localStorage.setItem('products', JSON.stringify(updatedList));
  router.push('/admin/masters/products');
};

  if (!productToEdit) return <p className="p-10 text-center">Loading Product Details...</p>;

  return (
    <div className="page-container py-10">
      <ProductForm 
        initialData={productToEdit} 
        onSave={handleUpdate} 
        onCancel={() => router.back()} 
      />
    </div>
  );
};

export default EditProductPage;