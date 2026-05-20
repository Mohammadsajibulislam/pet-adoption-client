"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdPerson, MdImage } from "react-icons/md";

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (name, email, password, confirmPassword) => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
      newErrors.email = "Enter a valid email address";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    else if (!/[A-Z]/.test(password))
      newErrors.password = "Must contain at least one uppercase letter";
    else if (!/[a-z]/.test(password))
      newErrors.password = "Must contain at least one lowercase letter";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const photoURL = formData.get("photoURL");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    const validationErrors = validate(name, email, password, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    setErrors({});

    const { data, error } = await authClient.signUp.email({
      name, email, password, image: photoURL,
    });
    setLoading(false);
    if (data) {
      toast.success("Account created successfully!");
      router.push("/login");
    }
    if (error) {
      toast.error(error.message || "Signup failed. Please try again.");
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  const inputClass = "w-full border pl-10 pr-4 py-3 outline-none focus:border-orange-400 rounded-xl text-sm";

  return (
    <div className="min-h-screen flex">

      {/* Left Side — Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Image src="/pawnest-logo-icon.png" alt="PawNest" width={36} height={36} />
            <span className="text-2xl font-bold">
              <span className="text-gray-800">Paw</span>
              <span className="text-orange-500">Nest</span>
            </span>
          </Link>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Create Account</h1>
          <p className="text-gray-500 mb-6">Join PawNest and find your companion</p>

          <form onSubmit={onSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" name="name" placeholder="John Doe" className={inputClass} />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="email" name="email" placeholder="john@example.com" className={inputClass} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Photo URL <span className="text-gray-400 font-normal">(optional)</span></label>
              <div className="relative">
                <MdImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="url" name="photoURL" placeholder="https://example.com/photo.jpg" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="password" name="password" placeholder="Min 6 chars, 1 uppercase, 1 lowercase" className={inputClass} />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="password" name="confirmPassword" placeholder="Re-enter your password" className={inputClass} />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition cursor-pointer disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign Up"}
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
            Sign up with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-500 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex flex-1 bg-orange-50 items-center justify-center p-10">
        <div className="text-center">
          <div className="relative w-80 h-80 mx-auto mb-6">
            <Image src="/hero-banner-pets.png" alt="Pets" fill className="object-contain" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Join Our <span className="text-orange-500">Community</span>
          </h2>
          <p className="text-gray-500">
            Connect with pets who need a loving forever home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;