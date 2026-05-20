"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdVisibility, MdPets } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { BsXCircle } from "react-icons/bs";

const MyRequestsPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const fetchRequests = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/user/${user.id}`,
        { headers: { authorization: `Bearer ${tokenData?.token}` } }
      );
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user]);

  const handleCancel = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${cancellingId}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${tokenData?.token}` },
        }
      );
      toast.success("Request cancelled successfully!");
      setShowCancelModal(false);
      setCancellingId(null);
      fetchRequests();
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const statusConfig = {
    pending: { label: "Pending", class: "bg-yellow-100 text-yellow-600" },
    approved: { label: "Approved", class: "bg-green-100 text-green-600" },
    rejected: { label: "Rejected", class: "bg-red-100 text-red-500" },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <AiOutlineLoading3Quarters size={36} className="text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-orange-500 text-sm font-semibold uppercase tracking-widest mb-1">
          <MdPets size={16} />
          Adoption Tracker
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">My Requests</h1>
        <p className="text-gray-500 mt-1">Track the status of your adoption requests.</p>
      </div>

      {requests.length === 0 ? (
        <div className="border rounded-2xl text-center py-20 text-gray-400">
          <MdPets size={48} className="mx-auto mb-3 text-gray-200" />
          <p className="text-xl font-semibold">No requests yet</p>
          <p className="text-sm mt-1">Browse pets and submit an adoption request!</p>
          <Link href="/all-pets">
            <button className="mt-5 bg-orange-500 text-white px-6 py-2.5 text-sm font-semibold cursor-pointer hover:bg-orange-600 transition rounded-xl">
              Browse Pets
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white hover:shadow-sm transition">
              <img
                src={req.petImage}
                alt={req.petName}
                className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
              />

              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{req.petName}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-gray-400 mt-1">
                  <span>
                    Requested: {new Date(req.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>
                    Pickup: {new Date(req.pickupDate).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </span>
                </div>
                <span className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full capitalize ${statusConfig[req.status]?.class}`}>
                  {statusConfig[req.status]?.label}
                </span>
              </div>

              <div className="flex gap-2">
                <Link href={`/all-pets/${req.petId}`}>
                  <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 transition cursor-pointer rounded-lg">
                    <MdVisibility size={14} /> View
                  </button>
                </Link>
                {req.status === "pending" && (
                  <button
                    onClick={() => { setCancellingId(req._id); setShowCancelModal(true); }}
                    className="flex items-center gap-1.5 border border-red-200 text-red-500 px-3 py-1.5 text-xs font-semibold hover:bg-red-50 transition cursor-pointer rounded-lg"
                  >
                    <BsXCircle size={13} /> Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Cancel Request</h2>
              <button onClick={() => setShowCancelModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <FaTimes size={18} />
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to cancel this adoption request?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border py-2.5 text-sm font-semibold hover:bg-gray-50 transition cursor-pointer rounded-xl"
              >
                No, Keep it
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 text-sm font-bold transition cursor-pointer rounded-xl"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequestsPage;