"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { MdPets, MdPlaylistAdd, MdFormatListBulleted } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const DashboardPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        {user?.image ? (
          <img
            src={user.image}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover border-2 border-cyan-300"
          />
        ) : (
          <FaUserCircle size={56} className="text-cyan-400" />
        )}
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/dashboard/my-listings">
          <div className="border rounded-xl p-6 hover:shadow-md hover:border-cyan-300 transition cursor-pointer">
            <MdFormatListBulleted size={32} className="text-cyan-500 mb-3" />
            <h3 className="font-bold text-lg">My Listings</h3>
            <p className="text-gray-500 text-sm">Manage your pet listings</p>
          </div>
        </Link>

        <Link href="/dashboard/add-pet">
          <div className="border rounded-xl p-6 hover:shadow-md hover:border-cyan-300 transition cursor-pointer">
            <MdPlaylistAdd size={32} className="text-cyan-500 mb-3" />
            <h3 className="font-bold text-lg">Add Pet</h3>
            <p className="text-gray-500 text-sm">List a new pet for adoption</p>
          </div>
        </Link>

        <Link href="/my-requests">
          <div className="border rounded-xl p-6 hover:shadow-md hover:border-cyan-300 transition cursor-pointer">
            <MdPets size={32} className="text-cyan-500 mb-3" />
            <h3 className="font-bold text-lg">My Requests</h3>
            <p className="text-gray-500 text-sm">Track your adoption requests</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;