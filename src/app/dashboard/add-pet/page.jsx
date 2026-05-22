"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { MdPets, MdLock } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const speciesList = ["Dog", "Cat", "Bird", "Rabbit", "Others"];
const genderList = ["Male", "Female"];
const healthList = ["Excellent", "Good", "Fair"];
const vaccinationList = ["Fully Vaccinated", "Partially Vaccinated", "Not Vaccinated"];

const AddPetPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [user, isPending, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <AiOutlineLoading3Quarters size={36} className="text-orange-500 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formData.entries());
    petData.ownerEmail = user?.email;
    petData.adoptionFee = Number(petData.adoptionFee);
    petData.age = Number(petData.age);

    try {
      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        toast.error("Authentication failed. Please login again.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(petData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Server error: ${res.status}`);
      }

      const data = await res.json();
      if (data.id) {
        toast.success("Pet added successfully!");
        router.push("/dashboard/my-listings");
      } else {
        toast.error("Failed to add pet. Please try again.");
      }
    } catch (error) {
      console.error("Add pet error:", error);
      toast.error(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border px-4 py-2.5 rounded-xl text-sm outline-none focus:border-orange-400 bg-white";
  const selectClass = "w-full border px-4 py-2.5 rounded-xl text-sm outline-none focus:border-orange-400 bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
          <MdPets size={24} className="text-orange-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Pet</h1>
          <p className="text-gray-500 text-sm">Fill in the details below to add a new pet for adoption.</p>
        </div>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="flex-1 border rounded-2xl p-6 bg-white">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Pet Name <span className="text-red-400">*</span></label>
                <input name="name" required placeholder="Enter pet name" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Species <span className="text-red-400">*</span></label>
                <select name="species" required className={selectClass}>
                  <option value="">Select species</option>
                  {speciesList.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Breed <span className="text-red-400">*</span></label>
                <input name="breed" required placeholder="Enter breed" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Age <span className="text-red-400">*</span></label>
                <div className="relative">
                  <input name="age" required placeholder="Enter age" className={inputClass + " pr-16"} />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Years</span>
                </div>
              </div>
              <div>
                <label className={labelClass}>Gender <span className="text-red-400">*</span></label>
                <select name="gender" required className={selectClass}>
                  <option value="">Select gender</option>
                  {genderList.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Image URL <span className="text-red-400">*</span></label>
              <input name="imageUrl" type="url" required placeholder="https://example.com/image.jpg" className={inputClass} />
              <p className="text-xs text-gray-400 mt-1">Use imgbb or postimage to get image URL</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Health Status <span className="text-red-400">*</span></label>
                <select name="healthStatus" required className={selectClass}>
                  <option value="">Select health status</option>
                  {healthList.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Vaccination Status <span className="text-red-400">*</span></label>
                <select name="vaccinationStatus" required className={selectClass}>
                  <option value="">Select vaccination status</option>
                  {vaccinationList.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Location <span className="text-red-400">*</span></label>
                <input name="location" required placeholder="Enter location" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Adoption Fee <span className="text-red-400">*</span></label>
                <input name="adoptionFee" type="number" required placeholder="Enter adoption fee" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Description <span className="text-red-400">*</span></label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Write about the pet, its personality, habits, and why it needs a loving home..."
                className={inputClass + " resize-none"}
              />
            </div>

            <div className="bg-gray-50 border rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Owner Email</p>
                <p className="text-sm font-medium text-gray-700">
                  {user?.email} <span className="text-gray-400">(Auto-filled)</span>
                </p>
              </div>
              <MdLock className="text-gray-400" size={18} />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 border py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-bold transition cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <MdPets size={18} />
                {loading ? "Adding Pet..." : "Add Pet"}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:w-64 space-y-4">
          <div className="border rounded-2xl p-5 bg-orange-50 border-orange-100">
            <div className="flex items-center gap-2 mb-3">
              <FaLightbulb className="text-orange-400" size={18} />
              <h3 className="font-bold text-gray-900">Tips for a Great Listing</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-gray-600">
              {[
                "Use a clear and high-quality image of your pet.",
                "Provide accurate information about age, health and vaccination.",
                "Write a detailed description so adopters can know your pet better.",
                "Set a fair adoption fee.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-500 text-xs font-bold">✓</span>
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPetPage;