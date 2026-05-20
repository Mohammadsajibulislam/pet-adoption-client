"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  MdDashboard,
  MdPets,
  MdPlaylistAdd,
  MdFormatListBulleted,
  MdLogout,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <MdDashboard size={20} /> },
  { href: "/dashboard/my-listings", label: "My Listings", icon: <MdFormatListBulleted size={20} /> },
  { href: "/dashboard/add-pet", label: "Add Pet", icon: <MdPlaylistAdd size={20} /> },
  { href: "/my-requests", label: "My Requests", icon: <MdPets size={20} /> },
];

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Logged out!");
    router.push("/login");
  };

  const isActive = (href) => pathname === href;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">

      {/* Sidebar */}
      <aside className="md:w-64 flex-shrink-0">
        <div className="border rounded-2xl overflow-hidden">

          {/* User Info */}
          <div className="bg-orange-50 p-5 border-b">
            <div className="flex items-center gap-3">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                <span className="text-xs bg-orange-100 text-orange-500 px-2 py-0.5 rounded-full font-medium">
                  Pet Owner
                </span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive(link.href)
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition cursor-pointer mt-2"
            >
              <MdLogout size={20} />
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
};

export default DashboardLayout;