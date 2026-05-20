"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useState } from "react";
import { MdLogout, MdDashboard, MdPets } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-pets", label: "All Pets" },
    { href: "/my-requests", label: "My Requests" },
    { href: "/dashboard/add-pet", label: "Add Pet" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/pawnest-logo-icon.png"
            alt="PawNest Logo"
            width={36}
            height={36}
          />
          <span className="text-xl font-bold">
            <span className="text-gray-800">Paw</span>
            <span className="text-orange-500">Nest</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`pb-1 transition border-b-2 ${
                  isActive(link.href)
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-gray-600 hover:text-orange-500"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
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
                    className="w-9 h-9 rounded-full object-cover border-2 border-orange-200"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user.name?.split(" ")[0]}
                </span>
                <FaChevronDown size={12} className="text-gray-400" />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white border rounded-xl shadow-lg w-48 py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
                  >
                    <MdDashboard size={16} /> Dashboard
                  </Link>
                  <Link
                    href="/my-requests"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
                  >
                    <MdPets size={16} /> My Requests
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setDropdownOpen(false); }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition cursor-pointer"
                  >
                    <MdLogout size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition cursor-pointer">
                Login
              </button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm font-medium ${
                isActive(link.href)
                  ? "text-orange-500"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;