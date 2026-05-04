"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Internal UI Components
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// Validations & Assets
import { forgotPasswordSchema, loginSchema } from "@/lib/validations"; // Ensure this schema has 'username' validation
import { cloudexSmallLogo } from "@/assets";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Using your existing validation logic
    resolver: yupResolver(forgotPasswordSchema), 
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Validated Data:", data);

    // Simple delay for UX and then redirecting
    setTimeout(() => {
      setLoading(false);
      router.push("/reset-password");
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8 backdrop-blur-md">
      
      {/* Header */}
      <div className="flex flex-col gap-2 items-center">
        <Image 
          src={cloudexSmallLogo} 
          alt="CloudEx Logo" 
          width={120} 
          height={40} 
          className="object-contain" 
        />
        <h2 className="text-3xl font-bold text-center text-white mt-2">
          Forgot Password
        </h2>
        <p className="text-sm text-center text-white/80">
          Enter your username to reset your password
        </p>
      </div>

      {/* Form with Hook Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
        
        <Input
          name="username"
          label="Username"
          placeholder="Enter username"
          register={register}
          error={errors.username}
        />

        <Button 
          loading={loading} 
          type="submit" 
          text={loading ? "Verifying..." : "Next"} 
        />

        <div className="text-center">
          <Link 
            href="/login" 
            className="text-sm text-white hover:underline transition"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;