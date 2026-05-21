"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  MdDashboard,
  MdPets,
  MdPlaylistAdd,
  MdFormatListBulleted,
  MdLogout,
} from "react-icons/md";
import { FaPaw } from "react-icons/fa";
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">

            {/* User Info */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5">
              <div className="flex items-center gap-3">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white font-extrabold text-2xl border-2 border-white/30">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">{user?.name}</p>
                  <p className="text-xs text-orange-100 truncate">{user?.email}</p>
                  <span className="inline-block mt-1 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
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
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive(link.href)
                      ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

              <div className="pt-2 border-t mt-2">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 w-full transition cursor-pointer"
                >
                  <MdLogout size={20} />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;