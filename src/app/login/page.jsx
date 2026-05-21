"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock } from "react-icons/md";
import { FaHeart, FaShieldAlt, FaPaw } from "react-icons/fa";

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
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-md">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaPaw size={20} className="text-orange-500" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-gray-800">Paw</span>
              <span className="text-orange-500">Nest</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
              Welcome Back! 👋
            </h1>
            <p className="text-gray-500">
              Login to continue your adoption journey
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                  <MdEmail size={16} className="text-orange-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full border-2 pl-14 pr-4 py-3.5 outline-none focus:border-orange-400 rounded-xl text-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                  <MdLock size={16} className="text-orange-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="w-full border-2 pl-14 pr-4 py-3.5 outline-none focus:border-orange-400 rounded-xl text-sm transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition cursor-pointer disabled:opacity-60 shadow-lg shadow-orange-200 text-base"
            >
              {loading ? "Logging in..." : "Login to PawNest"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-gray-400 text-sm px-2">or continue with</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button
            onClick={handleGoogleSignin}
            className="w-full border-2 border-gray-100 flex items-center justify-center gap-3 py-3.5 hover:bg-gray-50 hover:border-gray-200 transition cursor-pointer rounded-xl text-sm font-semibold text-gray-700"
          >
            <FcGoogle size={22} />
            Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Do not have an account?{" "}
            <Link href="/signup" className="text-orange-500 font-bold hover:underline">
              Sign Up Free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex flex-1 bg-orange-50 items-center justify-center p-10 relative overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute w-64 h-64 bg-orange-200 rounded-full opacity-20 -top-10 -right-10" />
        <div className="absolute w-48 h-48 bg-orange-300 rounded-full opacity-10 bottom-10 left-10" />

        <div className="relative z-10 text-center max-w-sm">

          {/* Image */}
          <div className="relative w-72 h-72 mx-auto mb-6">
            <div className="absolute inset-0 bg-orange-200 rounded-[40px] opacity-40" />
            <div className="absolute inset-2 rounded-[36px] overflow-hidden">
              <Image
                src="/hero-banner-pets6.png"
                alt="Pets"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Find Your Perfect{" "}
            <span className="text-orange-500">Companion</span>
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Thousands of adorable pets are waiting for a loving home.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6">
            <div className="bg-white rounded-2xl px-5 py-3 shadow-sm">
              <p className="text-2xl font-extrabold text-orange-500">500+</p>
              <p className="text-xs text-gray-400">Pets Available</p>
            </div>
            <div className="bg-white rounded-2xl px-5 py-3 shadow-sm">
              <p className="text-2xl font-extrabold text-orange-500">1200+</p>
              <p className="text-xs text-gray-400">Happy Adoptions</p>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
            <FaShieldAlt className="text-green-400" size={14} />
            Safe, secure and trusted platform
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;