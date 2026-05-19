import Link from "next/link";
import { MdPets, MdPlaylistAdd, MdFormatListBulleted } from "react-icons/md";

const DashboardLayout = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">

      {/* Sidebar */}
      <aside className="md:w-56 flex-shrink-0">
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col gap-1">
          <Link
            href="/dashboard/my-listings"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-cyan-50 hover:text-cyan-600 transition"
          >
            <MdFormatListBulleted size={18} /> My Listings
          </Link>
          <Link
            href="/dashboard/add-pet"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-cyan-50 hover:text-cyan-600 transition"
          >
            <MdPlaylistAdd size={18} /> Add Pet
          </Link>
          <Link
            href="/my-requests"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-cyan-50 hover:text-cyan-600 transition"
          >
            <MdPets size={18} /> My Requests
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;