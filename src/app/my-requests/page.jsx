"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdVisibility, MdCancel } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

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
        {
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        }
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${cancellingId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
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

  const statusStyle = {
    pending: "bg-yellow-100 text-yellow-600",
    approved: "bg-green-100 text-green-600",
    rejected: "bg-red-100 text-red-500",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <AiOutlineLoading3Quarters
          size={36}
          className="text-cyan-500 animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Requests</h1>

      {requests.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-semibold">No requests yet</p>
          <Link href="/all-pets">
            <button className="mt-4 bg-cyan-500 text-white px-6 py-2.5 text-sm font-semibold cursor-pointer hover:bg-cyan-600 transition">
              Browse Pets
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <img
                src={req.petImage}
                alt={req.petName}
                className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
              />

              <div className="flex-1">
                <h3 className="font-bold text-lg">{req.petName}</h3>
                <p className="text-sm text-gray-500">
                  Requested:{" "}
                  {new Date(req.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-500">
                  Pickup:{" "}
                  {new Date(req.pickupDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <span
                  className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                    statusStyle[req.status]
                  }`}
                >
                  {req.status}
                </span>
              </div>

              <div className="flex gap-2">
                <Link href={`/all-pets/${req.petId}`}>
                  <button className="flex items-center gap-1 border border-gray-300 text-gray-600 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 transition cursor-pointer rounded-lg">
                    <MdVisibility size={14} /> View
                  </button>
                </Link>

                {req.status === "pending" && (
                  <button
                    onClick={() => {
                      setCancellingId(req._id);
                      setShowCancelModal(true);
                    }}
                    className="flex items-center gap-1 border border-red-300 text-red-500 px-3 py-1.5 text-xs font-semibold hover:bg-red-50 transition cursor-pointer rounded-lg"
                  >
                    <MdCancel size={14} /> Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Cancel Request</h2>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <FaTimes size={18} />
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to cancel this adoption request?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border py-2.5 text-sm font-semibold hover:bg-gray-50 transition cursor-pointer rounded-lg"
              >
                No, Keep it
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 text-sm font-semibold transition cursor-pointer rounded-lg"
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