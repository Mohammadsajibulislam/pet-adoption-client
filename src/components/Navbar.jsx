"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout, MdDashboard } from "react-icons/md";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <div className="bg-white shadow-sm py-3 sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-cyan-600">
          PawsHome
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-6 text-sm font-medium">
          <li>
            <Link href="/" className="hover:text-cyan-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/all-pets" className="hover:text-cyan-600 transition">
              All Pets
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link href="/my-requests" className="hover:text-cyan-600 transition">
                  My Requests
                </Link>
              </li>
              <li>
                <Link href="/dashboard/add-pet" className="hover:text-cyan-600 transition">
                  Add Pet
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Auth Section */}
        <div className="flex items-center gap-3 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 cursor-pointer"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border-2 border-cyan-300"
                  />
                ) : (
                  <FaUserCircle size={36} className="text-cyan-500" />
                )}
                <span className="text-sm font-medium hidden md:block">
                  {user.name}
                </span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white border rounded-xl shadow-lg w-44 py-2 z-50">
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition"
                  >
                    <MdDashboard size={16} /> Dashboard
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setDropdownOpen(false); }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full transition cursor-pointer"
                  >
                    <MdLogout size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-5 py-2 transition cursor-pointer">
                Login
              </button>
            </Link>
          )}
        </div>

      </nav>
    </div>
  );
};

export default Navbar;