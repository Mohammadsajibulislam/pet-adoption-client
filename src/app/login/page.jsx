"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdPets } from "react-icons/md";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const { data, error } = await authClient.signIn.email({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    setLoading(false);
    if (data) {
      toast.success("Login successful!");
      router.push("/");
    }
    if (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side — Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Image src="/pawnest-logo-icon.png" alt="PawNest" width={36} height={36} />
            <span className="text-2xl font-bold">
              <span className="text-gray-800">Paw</span>
              <span className="text-orange-500">Nest</span>
            </span>
          </Link>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Welcome Back</h1>
          <p className="text-gray-500 mb-8">Login to continue your adoption journey</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full border pl-10 pr-4 py-3 outline-none focus:border-orange-400 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="w-full border pl-10 pr-4 py-3 outline-none focus:border-orange-400 rounded-xl text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition cursor-pointer disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={handleGoogleSignin}
            className="w-full border-2 flex items-center justify-center gap-2 py-3 hover:bg-gray-50 transition cursor-pointer rounded-xl text-sm font-semibold"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Do not have an account?{" "}
            <Link href="/signup" className="text-orange-500 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side — Banner */}
      <div className="hidden lg:flex flex-1 bg-orange-50 items-center justify-center p-10">
        <div className="text-center">
          <div className="relative w-80 h-80 mx-auto mb-6">
            <Image
              src="/hero-banner-pets.png"
              alt="Pets"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Find Your Perfect <span className="text-orange-500">Companion</span>
          </h2>
          <p className="text-gray-500">
            Thousands of adorable pets are waiting for a loving home.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">500+</p>
              <p className="text-xs text-gray-400">Pets Available</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">1200+</p>
              <p className="text-xs text-gray-400">Happy Adoptions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;