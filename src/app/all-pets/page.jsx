"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuMapPin } from "react-icons/lu";
import { FaDog, FaCat, FaDove } from "react-icons/fa6";
import { GiRabbit } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { MdPets, MdFilterList } from "react-icons/md";
import { FaRegHeart, FaRegCalendar } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsGenderAmbiguous } from "react-icons/bs";

const speciesIcon = {
  Dog: <FaDog size={11} />,
  Cat: <FaCat size={11} />,
  Bird: <FaDove size={11} />,
  Rabbit: <GiRabbit size={11} />,
};

const speciesList = ["all", "Dog", "Cat", "Bird", "Rabbit", "Others"];

const AllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");

  const fetchPets = async () => {
    setLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/pets?`;
      if (search) url += `search=${search}&`;
      if (species !== "all") url += `species=${species}`;
      const res = await fetch(url);
      const data = await res.json();
      setPets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [species]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPets();
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="bg-orange-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-orange-500 text-sm font-semibold uppercase tracking-widest mb-1">
              <MdPets size={16} />
              Find your companion
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">All Pets</h1>
            <p className="text-gray-500 mt-1">
              Find your perfect companion from our adorable pets.
            </p>
          </div>
          <div className="hidden md:block relative w-72 h-36">
            <Image
              src="/all-pets-banner.png"
              alt="All Pets Banner"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1">
            <div className="relative flex-1">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pets by name..."
                className="w-full border pl-10 pr-4 py-2.5 outline-none focus:border-orange-400 rounded-lg text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 text-sm font-semibold transition cursor-pointer rounded-lg"
            >
              Search
            </button>
          </form>

          {/* Species Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <MdFilterList size={20} className="text-gray-400" />
            {speciesList.map((s) => (
              <button
                key={s}
                onClick={() => setSpecies(s)}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition cursor-pointer capitalize ${
                  species === s
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-orange-400"
                }`}
              >
                {s === "all" ? "All Species" : s}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <AiOutlineLoading3Quarters
              size={36}
              className="text-orange-500 animate-spin"
            />
          </div>
        )}

        {/* Empty */}
        {!loading && pets.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <MdPets size={48} className="mx-auto mb-3 text-gray-200" />
            <p className="text-xl font-semibold">No pets found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        )}

        {/* Pets Grid */}
        {!loading && pets.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="border rounded-2xl overflow-hidden hover:shadow-lg transition group bg-white"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    {speciesIcon[pet.species]} {pet.species}
                  </span>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:text-red-400 transition cursor-pointer">
                    <FaRegHeart size={14} className="text-gray-400" />
                  </button>
                  {pet.status === "adopted" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Adopted
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-lg">{pet.name}</h3>

                  <div className="flex items-center gap-3 text-gray-400 text-xs mt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <FaRegCalendar size={11} /> {pet.age}
                    </span>
                    <span className="flex items-center gap-1">
                      <BsGenderAmbiguous size={12} /> {pet.gender}
                    </span>
                    <span className="flex items-center gap-1">
                      <LuMapPin size={11} /> {pet.location}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <p className="text-orange-500 font-bold text-lg">
                      ${pet.adoptionFee}
                    </p>
                    <Link href={`/all-pets/${pet._id}`}>
                      <button className="border border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPetsPage;