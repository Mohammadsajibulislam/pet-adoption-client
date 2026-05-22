"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { LuMapPin } from "react-icons/lu";
import {
  FaRegCalendar,
  FaSyringe,
  FaUserCircle,
  FaShieldAlt,
} from "react-icons/fa";
import {
  FaVenusMars,
  FaDog,
} from "react-icons/fa6";
import { MdHealthAndSafety, MdPets } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";

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
          className="text-orange-500 animate-spin"
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
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-orange-500 transition">Home</Link>
        <BsChevronRight size={12} />
        <Link href="/all-pets" className="hover:text-orange-500 transition">All Pets</Link>
        <BsChevronRight size={12} />
        <span className="text-gray-700 font-medium">{pet.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — Pet Info */}
        <div className="lg:col-span-2">

          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden h-80 mb-6">
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
            <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${
              pet.status === "adopted"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}>
              {pet.status === "adopted" ? "Adopted" : "Available"}
            </span>
          </div>

          {/* Name & Price */}
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-4xl font-extrabold text-gray-900">{pet.name}</h1>
                <span className="bg-orange-100 text-orange-500 text-xs font-bold px-3 py-1 rounded-full">
                  {pet.species}
                </span>
              </div>
              <p className="text-gray-500">{pet.breed}</p>
            </div>
            <p className="text-3xl font-extrabold text-orange-500">
              ${pet.adoptionFee}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {[
              { icon: <FaRegCalendar className="text-orange-400" />, label: "Age", value: pet.age },
              { icon: <FaVenusMars className="text-orange-400" />, label: "Gender", value: pet.gender },
              { icon: <FaDog className="text-orange-400" />, label: "Breed", value: pet.breed },
              { icon: <LuMapPin className="text-orange-400" />, label: "Location", value: pet.location },
              { icon: <MdHealthAndSafety className="text-orange-400" />, label: "Health", value: pet.healthStatus },
              { icon: <FaSyringe className="text-orange-400" />, label: "Vaccinated", value: pet.vaccinationStatus },
            ].map((item, i) => (
              <div key={i} className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                  {item.icon} {item.label}
                </div>
                <p className="font-semibold text-gray-800 text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              About {pet.name}
            </h2>
            <p className="text-gray-600 leading-relaxed">{pet.description}</p>
          </div>

          {/* Owner Info */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaUserCircle className="text-orange-400" /> Owner Information
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg">
                {pet.ownerEmail?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{pet.ownerEmail}</p>
                <p className="text-xs text-gray-400">Pet Owner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Adoption Form */}
        <div className="lg:col-span-1 space-y-4">

          {/* Adoption Card */}
          <div className="border rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MdPets className="text-orange-500" /> Adoption Request
            </h2>

            {pet.status === "adopted" ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-500 font-semibold text-sm">
                  This pet has already been adopted
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Pet Name</label>
                  <input
                    value={pet.name}
                    readOnly
                    className="w-full border px-3 py-2.5 rounded-lg text-sm bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Your Name</label>
                  <input
                    value={user?.name || "Please login first"}
                    readOnly
                    className="w-full border px-3 py-2.5 rounded-lg text-sm bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Your Email</label>
                  <input
                    value={user?.email || "Please login first"}
                    readOnly
                    className="w-full border px-3 py-2.5 rounded-lg text-sm bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Pickup Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full border px-3 py-2.5 rounded-lg text-sm outline-none focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                    Message <span className="normal-case text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message to the pet owner..."
                    rows={3}
                    className="w-full border px-3 py-2.5 rounded-lg text-sm outline-none focus:border-orange-400 resize-none"
                  />
                </div>

                <button
                  onClick={handleAdoptRequest}
                  disabled={submitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <MdPets size={18} />
                  {submitting ? "Submitting..." : `Adopt ${pet.name}`}
                </button>

                <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                  <FaShieldAlt className="text-green-400" />
                  Your information is safe and secure
                </p>

                {!user && (
                  <p className="text-center text-xs text-gray-400">
                    You need to{" "}
                    <Link href="/login" className="text-orange-500 underline">
                      login
                    </Link>{" "}
                    to submit a request
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Adopt Responsibly */}
          {/* <div className="border rounded-2xl p-5 bg-orange-50 border-orange-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaShieldAlt className="text-orange-500" size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Adopt Responsibly</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Ensure you can provide a loving, safe and forever home for your new companion.
                </p>
              </div>
            </div>
            <div className="mt-4 relative h-28 rounded-xl overflow-hidden">
              <Image
                src="/adopt-responsibly-illustration.png"
                alt="Adopt Responsibly"
                fill
                className="object-cover"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;