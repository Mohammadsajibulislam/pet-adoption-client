"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { MdPets, MdLock, MdCloudUpload } from "react-icons/md";
import { FaLightbulb, FaImage } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const speciesList = ["Dog", "Cat", "Bird", "Rabbit", "Others"];
const genderList = ["Male", "Female"];
const healthList = ["Excellent", "Good", "Fair"];
const vaccinationList = [
  "Fully Vaccinated",
  "Partially Vaccinated",
  "Not Vaccinated",
];

const AddPetPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  // Image upload এর জন্য নতুন states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  // Auth check
  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [user, isPending, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <AiOutlineLoading3Quarters
          size={36}
          className="text-orange-500 animate-spin"
        />
      </div>
    );
  }

  if (!user) return null;

  // ─────────────────────────────────────
  // Image Select হলে এই function চলবে
  // ─────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File size check — 2MB এর বেশি হলে reject
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB!");
      return;
    }

    // File type check
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file!");
      return;
    }

    setImageFile(file);

    // Preview দেখাও (device থেকে select করার সাথে সাথে)
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ─────────────────────────────────────
  // imgbb তে upload করার function
  // ─────────────────────────────────────
  const uploadImageToImgbb = async (file) => {
  const formData = new FormData();
  formData.append("image", file); // binary file পাঠাচ্ছি

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",      // POST method use করতে হবে
      body: formData,      // multipart/form-data automatically set হয়
    }
  );

  const data = await res.json();
  console.log("imgbb response:", data); // Debug এর জন্য

  if (data.success) {
    return data.data.url; // Main image URL return করো
  } else {
    throw new Error("Image upload failed: " + data.error?.message);
  }
};

  // ─────────────────────────────────────
  // Form Submit
  // ─────────────────────────────────────
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // আগে image upload করো
      let imageUrl = "";

      if (imageFile) {
        setImageUploading(true);
        toast.loading("Uploading image...");
        imageUrl = await uploadImageToImgbb(imageFile);
        toast.dismiss();
        setImageUploading(false);
      } else {
        toast.error("Please select an image!");
        setLoading(false);
        return;
      }

      // Form data collect করো
      const formData = new FormData(e.currentTarget);
      const petData = Object.fromEntries(formData.entries());
      petData.ownerEmail = user?.email;
      petData.imageUrl = imageUrl; // imgbb থেকে আসা URL
      petData.adoptionFee = Number(petData.adoptionFee);

      // Backend এ পাঠাও
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(petData),
        }
      );

      const data = await res.json();
      if (data.id) {
        toast.success("Pet added successfully!");
        router.push("/dashboard/my-listings");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setImageUploading(false);
    }
  };

  const inputClass =
    "w-full border px-4 py-2.5 rounded-xl text-sm outline-none focus:border-orange-400 bg-white";
  const selectClass =
    "w-full border px-4 py-2.5 rounded-xl text-sm outline-none focus:border-orange-400 bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
          <MdPets size={24} className="text-orange-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Pet</h1>
          <p className="text-gray-500 text-sm">
            Fill in the details below to add a new pet for adoption.
          </p>
        </div>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="flex-1 border rounded-2xl p-6 bg-white">
          <form onSubmit={onSubmit} className="space-y-5">

            {/* ─── IMAGE UPLOAD SECTION ─── */}
            <div>
              <label className={labelClass}>
                Pet Image <span className="text-red-400">*</span>
              </label>

              {/* Image Preview */}
              {imagePreview ? (
                <div className="relative mb-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl border-2 border-orange-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-red-600 cursor-pointer"
                  >
                    X
                  </button>
                </div>
              ) : (
                /* Upload Box — click করলে file picker খুলবে */
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-orange-300 rounded-xl cursor-pointer hover:bg-orange-50 transition">
                  <MdCloudUpload size={36} className="text-orange-400 mb-2" />
                  <p className="text-sm font-semibold text-gray-600">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG, WEBP — Max 2MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden" // Input hide করো, label এ click করলে খুলবে
                  />
                </label>
              )}
            </div>
            {/* ─────────────────────────── */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>
                  Pet Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="name"
                  required
                  placeholder="Buddy"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Species <span className="text-red-400">*</span>
                </label>
                <select name="species" required className={selectClass}>
                  <option value="">Select species</option>
                  {speciesList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>
                  Breed <span className="text-red-400">*</span>
                </label>
                <input
                  name="breed"
                  required
                  placeholder="Golden Retriever"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Age <span className="text-red-400">*</span>
                </label>
                <input
                  name="age"
                  required
                  placeholder="2 years"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Gender <span className="text-red-400">*</span>
                </label>
                <select name="gender" required className={selectClass}>
                  <option value="">Select gender</option>
                  {genderList.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Health Status <span className="text-red-400">*</span>
                </label>
                <select name="healthStatus" required className={selectClass}>
                  <option value="">Select health status</option>
                  {healthList.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>
                  Vaccination Status <span className="text-red-400">*</span>
                </label>
                <select
                  name="vaccinationStatus"
                  required
                  className={selectClass}
                >
                  <option value="">Select vaccination status</option>
                  {vaccinationList.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Location <span className="text-red-400">*</span>
                </label>
                <input
                  name="location"
                  required
                  placeholder="New York"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Adoption Fee ($) <span className="text-red-400">*</span>
                </label>
                <input
                  name="adoptionFee"
                  type="number"
                  required
                  placeholder="150"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Tell us about this pet..."
                className={inputClass + " resize-none"}
              />
            </div>

            <div className="bg-gray-50 border rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Owner Email</p>
                <p className="text-sm font-medium text-gray-700">
                  {user?.email}{" "}
                  <span className="text-gray-400">(Auto-filled)</span>
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
                disabled={loading || imageUploading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-bold transition cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading || imageUploading ? (
                  <>
                    <AiOutlineLoading3Quarters
                      size={16}
                      className="animate-spin"
                    />
                    {imageUploading ? "Uploading..." : "Adding Pet..."}
                  </>
                ) : (
                  <>
                    <MdPets size={18} />
                    Add Pet
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Sidebar */}
        <div className="lg:w-64 space-y-4">
          <div className="border rounded-2xl p-5 bg-orange-50 border-orange-100">
            <div className="flex items-center gap-2 mb-3">
              <FaLightbulb className="text-orange-400" size={18} />
              <h3 className="font-bold text-gray-900">Image Tips</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-gray-600">
              {[
                "Clear, well-lit photo works best",
                "Show the pet's face clearly",
                "Maximum file size: 2MB",
                "JPG or PNG format recommended",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-500 text-xs font-bold">
                      ✓
                    </span>
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