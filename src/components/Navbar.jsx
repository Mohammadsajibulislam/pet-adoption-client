"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, Avatar } from "@heroui/react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-sm py-3 sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-cyan-600">🐾 PawsHome</span>
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-6 text-sm font-medium">
          <li><Link href="/" className="hover:text-cyan-600 transition">Home</Link></li>
          <li><Link href="/all-pets" className="hover:text-cyan-600 transition">All Pets</Link></li>
          <li><Link href="/my-requests" className="hover:text-cyan-600 transition">My Requests</Link></li>
          <li><Link href="/dashboard/add-pet" className="hover:text-cyan-600 transition">Add Pet</Link></li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button size="sm" className="bg-cyan-500 text-white rounded-none">Login</Button>
          </Link>
        </div>

      </nav>
    </div>
  );
};

export default Navbar;