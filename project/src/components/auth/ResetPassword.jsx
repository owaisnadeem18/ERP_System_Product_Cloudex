"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// UI Components
import InputPassword from "@/components/ui/InputPassword";
import Button from "@/components/ui/Button";

// Validations & Assets
import { resetPasswordSchema } from "@/lib/validations";
import { cloudexSmallLogo } from "@/assets";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    
    console.log("Password Reset Data:", data);

    // Simulate update logic
    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-md  border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8 ">
      
      {/* Header */}
      <div className="flex flex-col gap-2 items-center">

      <div className="p-0 bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl inline-flex items-center justify-center">
    <Image 
      src={cloudexSmallLogo} 
      alt="CloudEx Logo" 
      width={120} 
      height={40} 
      className="object-cover" 
    />
  </div>

        
        <h2 className="text-3xl font-bold text-center text-white mt-2">
          New Password
        </h2>
        <p className="text-sm text-center text-white/80">
          Enter your new strong password
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
        
        <InputPassword
          name="newPassword"
          label="New Password"
          placeholder="Min. 8 characters"
          register={register}
          error={errors.newPassword}
        />

        <InputPassword
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Repeat password"
          register={register}
          error={errors.confirmPassword}
        />

        <Button 
          loading={loading} 
          type="submit" 
          text={loading ? "Updating..." : "Reset Password"} 
        />
      </form>
    </div>
  );
};

export default ResetPassword;