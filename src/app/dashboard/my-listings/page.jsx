"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdEdit, MdDelete, MdVisibility, MdPeople } from "react-icons/md";
import { FaCheck, FaTimes } from "react-icons/fa";

const MyListingsPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingPet, setDeletingPet] = useState(null);
  const [editingPet, setEditingPet] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const fetchMyPets = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/owner/${user.email}`
      );
      const data = await res.json();
      setPets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPets();
  }, [user]);

  const fetchRequests = async (petId) => {
    setRequestsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/pet/${petId}`
      );
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setRequestsLoading(false);
    }
  };

  const handleOpenRequests = (pet) => {
    setSelectedPet(pet);
    setShowRequestsModal(true);
    fetchRequests(pet._id);
  };

  const handleApprove = async (requestId, petId) => {
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${requestId}/approve`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({ petId }),
        }
      );
      const data = await res.json();
      if (data.message) {
        toast.success("Request approved!");
        fetchRequests(petId);
        fetchMyPets();
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleReject = async (requestId, petId) => {
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${requestId}/reject`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );
      toast.success("Request rejected.");
      fetchRequests(petId);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleDelete = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${deletingPet._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );
      toast.success("Pet deleted successfully!");
      setShowDeleteModal(false);
      setDeletingPet(null);
      fetchMyPets();
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${editingPet._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      toast.success("Pet updated successfully!");
      setShowEditModal(false);
      setEditingPet(null);
      fetchMyPets();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setEditLoading(false);
    }
  };

  const totalListings = pets.length;
  const available = pets.filter((p) => p.status === "available").length;
  const adopted = pets.filter((p) => p.status === "adopted").length;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <AiOutlineLoading3Quarters
          size={36}
          className="text-cyan-500 animate-spin"
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">My Listings</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-cyan-600">{totalListings}</p>
          <p className="text-sm text-gray-500">Total Listings</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{available}</p>
          <p className="text-sm text-gray-500">Available</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-500">{adopted}</p>
          <p className="text-sm text-gray-500">Adopted</p>
        </div>
      </div>

      {/* Pets List */}
      {pets.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-semibold">No listings yet</p>
          <Link href="/dashboard/add-pet">
            <button className="mt-4 bg-cyan-500 text-white px-6 py-2.5 text-sm font-semibold cursor-pointer hover:bg-cyan-600 transition">
              Add Your First Pet
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-lg">{pet.name}</h3>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      pet.status === "adopted"
                        ? "bg-red-100 text-red-500"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {pet.status === "adopted" ? "Adopted" : "Available"}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {pet.species} • {pet.breed}
                </p>
                <p className="text-cyan-600 font-bold">${pet.adoptionFee}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleOpenRequests(pet)}
                  className="flex items-center gap-1 border border-cyan-500 text-cyan-600 px-3 py-1.5 text-xs font-semibold hover:bg-cyan-50 transition cursor-pointer rounded-lg"
                >
                  <MdPeople size={14} /> Requests
                </button>

                <button
                  onClick={() => {
                    setEditingPet(pet);
                    setShowEditModal(true);
                  }}
                  className="flex items-center gap-1 border border-gray-300 text-gray-600 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 transition cursor-pointer rounded-lg"
                >
                  <MdEdit size={14} /> Edit
                </button>

                <Link href={`/all-pets/${pet._id}`}>
                  <button className="flex items-center gap-1 border border-gray-300 text-gray-600 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 transition cursor-pointer rounded-lg">
                    <MdVisibility size={14} /> View
                  </button>
                </Link>

                <button
                  onClick={() => {
                    setDeletingPet(pet);
                    setShowDeleteModal(true);
                  }}
                  className="flex items-center gap-1 border border-red-300 text-red-500 px-3 py-1.5 text-xs font-semibold hover:bg-red-50 transition cursor-pointer rounded-lg"
                >
                  <MdDelete size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Requests Modal */}
      {showRequestsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl w-full max-w-xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Requests for {selectedPet?.name}
              </h2>
              <button
                onClick={() => setShowRequestsModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {requestsLoading ? (
              <div className="flex justify-center py-10">
                <AiOutlineLoading3Quarters
                  size={28}
                  className="text-cyan-500 animate-spin"
                />
              </div>
            ) : requests.length === 0 ? (
              <p className="text-center text-gray-400 py-10">
                No requests yet for this pet
              </p>
            ) : (
              <div className="space-y-3">
                {requests.map((req) => (
                  <div
                    key={req._id}
                    className="border rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <p className="font-semibold">{req.userName}</p>
                        <p className="text-sm text-gray-500">{req.userEmail}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Pickup: {new Date(req.pickupDate).toLocaleDateString()}
                        </p>
                        {req.message && (
                          <p className="text-sm text-gray-600 mt-1 italic">
                            "{req.message}"
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            req.status === "approved"
                              ? "bg-green-100 text-green-600"
                              : req.status === "rejected"
                              ? "bg-red-100 text-red-500"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {req.status}
                        </span>

                        {req.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleApprove(req._id, selectedPet._id)
                              }
                              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 text-xs font-semibold transition cursor-pointer rounded-lg"
                            >
                              <FaCheck size={10} /> Approve
                            </button>
                            <button
                              onClick={() =>
                                handleReject(req._id, selectedPet._id)
                              }
                              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-xs font-semibold transition cursor-pointer rounded-lg"
                            >
                              <FaTimes size={10} /> Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl w-full max-w-sm p-6">
            <h2 className="text-xl font-bold mb-2">Delete Pet</h2>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete{" "}
              <strong>{deletingPet?.name}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border py-2.5 text-sm font-semibold hover:bg-gray-50 transition cursor-pointer rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 text-sm font-semibold transition cursor-pointer rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingPet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit {editingPet.name}</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
                <input name="name" defaultValue={editingPet.name} required className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                  <input name="breed" defaultValue={editingPet.breed} required className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input name="age" defaultValue={editingPet.age} required className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input name="location" defaultValue={editingPet.location} required className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adoption Fee ($)</label>
                  <input name="adoptionFee" type="number" defaultValue={editingPet.adoptionFee} required className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input name="imageUrl" type="url" defaultValue={editingPet.imageUrl} required className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" defaultValue={editingPet.description} rows={3} required className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500 resize-none" />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 border py-2.5 text-sm font-semibold hover:bg-gray-50 transition cursor-pointer rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2.5 text-sm font-semibold transition cursor-pointer rounded-lg disabled:opacity-60"
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;