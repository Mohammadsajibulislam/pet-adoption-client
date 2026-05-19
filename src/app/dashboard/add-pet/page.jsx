"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const speciesList = ["Dog", "Cat", "Bird", "Rabbit", "Others"];
const genderList = ["Male", "Female"];
const healthList = ["Excellent", "Good", "Fair"];
const vaccinationList = ["Fully Vaccinated", "Partially Vaccinated", "Not Vaccinated"];

const AddPetPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formData.entries());
    petData.ownerEmail = user?.email;

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(petData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Pet added successfully!");
        router.push("/dashboard/my-listings");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add a Pet</h1>

      <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">

        {/* Pet Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
          <input name="name" required placeholder="Buddy" className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Species */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
            <select name="species" required className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500 bg-white">
              <option value="">Select species</option>
              {speciesList.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Breed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
            <input name="breed" required placeholder="Golden Retriever" className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500" />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input name="age" required placeholder="2 years" className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500" />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select name="gender" required className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500 bg-white">
              <option value="">Select gender</option>
              {genderList.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          {/* Health Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
            <select name="healthStatus" required className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500 bg-white">
              <option value="">Select health status</option>
              {healthList.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>

          {/* Vaccination Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vaccination Status</label>
            <select name="vaccinationStatus" required className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500 bg-white">
              <option value="">Select vaccination status</option>
              {vaccinationList.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input name="location" required placeholder="New York" className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500" />
          </div>

          {/* Adoption Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adoption Fee ($)</label>
            <input name="adoptionFee" type="number" required placeholder="150" className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500" />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input name="imageUrl" type="url" required placeholder="https://example.com/pet.jpg" className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" required rows={4} placeholder="Tell us about this pet..." className="w-full border px-4 py-2.5 rounded-lg text-sm outline-none focus:border-cyan-500 resize-none" />
        </div>

        {/* Owner Email (read only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Owner Email</label>
          <input type="email" value={user?.email || ""} readOnly className="w-full border px-4 py-2.5 rounded-lg text-sm bg-gray-50 cursor-not-allowed" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 transition cursor-pointer disabled:opacity-60"
        >
          {loading ? "Adding Pet..." : "Add Pet"}
        </button>
      </form>
    </div>
  );
};

export default AddPetPage;