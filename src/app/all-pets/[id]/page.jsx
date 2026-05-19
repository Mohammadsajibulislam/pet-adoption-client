"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar, FaSyringe, FaVenusMars } from "react-icons/fa6";
import { MdHealthAndSafety, MdPets } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const PetDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`
        );
        const data = await res.json();
        setPet(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  const handleAdoptRequest = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.email === pet.ownerEmail) {
      toast.error("You cannot adopt your own pet!");
      return;
    }

    if (pet.status === "adopted") {
      toast.error("This pet has already been adopted!");
      return;
    }

    if (!pickupDate) {
      toast.error("Please select a pickup date!");
      return;
    }

    setSubmitting(true);

    try {
      const { data: tokenData } = await authClient.token();

      const requestData = {
        petId: pet._id,
        petName: pet.name,
        petImage: pet.imageUrl,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        ownerEmail: pet.ownerEmail,
        pickupDate,
        message,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/requests`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Adoption request submitted successfully!");
        setPickupDate("");
        setMessage("");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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

  if (!pet) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-xl font-semibold">Pet not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left — Pet Info */}
        <div className="lg:col-span-2">
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="w-full h-80 object-cover rounded-xl"
          />

          <div className="mt-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h1 className="text-4xl font-bold">{pet.name}</h1>
              <span className="text-2xl font-bold text-cyan-600">
                ${pet.adoptionFee}
              </span>
            </div>

            <div className="flex items-center gap-1 text-gray-400 mt-1">
              <LuMapPin size={15} />
              <span className="text-sm">{pet.location}</span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 rounded-xl p-4 border">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Species</p>
                <p className="font-semibold mt-1 flex items-center gap-1">
                  <MdPets className="text-cyan-500" /> {pet.species}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Breed</p>
                <p className="font-semibold mt-1">{pet.breed}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Age</p>
                <p className="font-semibold mt-1 flex items-center gap-1">
                  <FaRegCalendar className="text-cyan-500" /> {pet.age}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Gender</p>
                <p className="font-semibold mt-1 flex items-center gap-1">
                  <FaVenusMars className="text-cyan-500" /> {pet.gender}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Health</p>
                <p className="font-semibold mt-1 flex items-center gap-1">
                  <MdHealthAndSafety className="text-cyan-500" /> {pet.healthStatus}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Vaccinated</p>
                <p className="font-semibold mt-1 flex items-center gap-1">
                  <FaSyringe className="text-cyan-500" /> {pet.vaccinationStatus}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-3">About {pet.name}</h2>
            <p className="text-gray-600 leading-relaxed">{pet.description}</p>
          </div>
        </div>

        {/* Right — Adoption Form */}
        <div className="lg:col-span-1">
          <div className="border rounded-xl p-6 sticky top-24 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Adoption Request</h2>

            {pet.status === "adopted" ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-500 font-semibold">
                  This pet has already been adopted
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Pet Name (read only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Name
                  </label>
                  <input
                    type="text"
                    value={pet.name}
                    readOnly
                    className="w-full border px-4 py-2.5 rounded-lg text-sm bg-gray-50 cursor-not-allowed"
                  />
                </div>

                {/* User Name (read only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={user?.name || "Please login first"}
                    readOnly
                    className="w-full border px-4 py-2.5 rounded-lg text-sm bg-gray-50 cursor-not-allowed"
                  />
                </div>

                {/* User Email (read only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="text"
                    value={user?.email || "Please login first"}
                    readOnly
                    className="w-full border px-4 py-2.5 rounded-lg text-sm bg-gray-50 cursor-not-allowed"
                  />
                </div>

                {/* Pickup Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell the owner why you want to adopt..."
                    rows={3}
                    className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  onClick={handleAdoptRequest}
                  disabled={submitting}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 transition cursor-pointer disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Adopt Now"}
                </button>

                {!user && (
                  <p className="text-center text-xs text-gray-400">
                    You need to{" "}
                    <a href="/login" className="text-cyan-500 underline">
                      login
                    </a>{" "}
                    to submit a request
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;