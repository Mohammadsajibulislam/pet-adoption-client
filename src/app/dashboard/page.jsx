"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { MdPets, MdPlaylistAdd, MdFormatListBulleted, MdTrendingUp } from "react-icons/md";
import { FaPaw } from "react-icons/fa";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [stats, setStats] = useState({ total: 0, available: 0, adopted: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/owner/${user.email}`
        );
        const pets = await res.json();
        setStats({
          total: pets.length,
          available: pets.filter((p) => p.status === "available").length,
          adopted: pets.filter((p) => p.status === "adopted").length,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [user]);

  const cards = [
    {
      href: "/dashboard/my-listings",
      icon: <MdFormatListBulleted size={28} className="text-orange-500" />,
      bg: "bg-orange-50",
      border: "border-orange-100",
      label: "My Listings",
      desc: "Manage your pet listings",
      stat: stats.total,
      statLabel: "Total pets",
    },
    {
      href: "/dashboard/add-pet",
      icon: <MdPlaylistAdd size={28} className="text-blue-500" />,
      bg: "bg-blue-50",
      border: "border-blue-100",
      label: "Add Pet",
      desc: "List a new pet for adoption",
      stat: null,
      statLabel: null,
    },
    {
      href: "/my-requests",
      icon: <MdPets size={28} className="text-green-500" />,
      bg: "bg-green-50",
      border: "border-green-100",
      label: "My Requests",
      desc: "Track your adoption requests",
      stat: null,
      statLabel: null,
    },
  ];

  return (
    <div>

      {/* Welcome */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute w-40 h-40 bg-white opacity-5 rounded-full -right-10 -top-10" />
        <div className="absolute w-24 h-24 bg-white opacity-5 rounded-full right-20 bottom-0" />

        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white font-extrabold text-2xl border-2 border-white/30">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-orange-100 text-sm">Welcome back,</p>
              <h2 className="text-2xl font-extrabold">{user?.name}</h2>
              <p className="text-orange-100 text-xs mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-center bg-white/10 rounded-2xl px-5 py-3">
              <p className="text-2xl font-extrabold">{stats.total}</p>
              <p className="text-xs text-orange-100">Total Pets</p>
            </div>
            <div className="text-center bg-white/10 rounded-2xl px-5 py-3">
              <p className="text-2xl font-extrabold">{stats.available}</p>
              <p className="text-xs text-orange-100">Available</p>
            </div>
            <div className="text-center bg-white/10 rounded-2xl px-5 py-3">
              <p className="text-2xl font-extrabold">{stats.adopted}</p>
              <p className="text-xs text-orange-100">Adopted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <MdTrendingUp className="text-orange-500" size={20} />
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {cards.map((card, i) => (
          <Link key={i} href={card.href}>
            <div className={`border-2 ${card.border} ${card.bg} rounded-2xl p-5 hover:shadow-md transition cursor-pointer group`}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition">
                  {card.icon}
                </div>
                {card.stat !== null && (
                  <span className="text-2xl font-extrabold text-gray-900">
                    {card.stat}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 text-base">{card.label}</h3>
              <p className="text-gray-500 text-xs mt-0.5">{card.desc}</p>
              {card.statLabel && (
                <p className="text-xs text-gray-400 mt-1">{card.statLabel}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <FaPaw className="text-orange-400" size={16} />
          <h3 className="font-bold text-gray-900">Tips for Better Listings</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Use high-quality photos of your pet",
            "Write a detailed and honest description",
            "Set a fair and reasonable adoption fee",
            "Keep your listings up to date",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-orange-500 text-xs font-bold">✓</span>
              </span>
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;